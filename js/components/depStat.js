import React from 'react'; 
import path from '../util/paths.js'; 
import {useKeys, statKeys, bonusKeys, calcValue} from '../util/helpers.js'; 
import {getPathFromName} from '../util/paths.js'; 
import EditableValue from './editableValue.js'; 

export default class depStat extends React.Component{
	render(){
		let {obj, index} = this.props; 
		let rendering = this.printDep(obj,index); 
		return this.printDep(obj, index);
	}
	printDep(obj, index){
		let use = obj.use.value; 
		switch(use){
			case 'stat':
				return this.printStat(obj, index); 
			case 'flat':
				return this.printFlat(obj, index);
			case 'die':
				return this.printDie(obj, index); 
		}
	}
	printStat(obj, index){
		return(
			<tr>
				{this.useSelect(obj, index)}
				<td>
					<select
						defaultValue={obj.stat.value}
						onChange={(event)=>this.props.modifyDep(this.props.name, [index,'stat'], event.target.value)}>
						{this.typeOptions(statKeys())}
					</select>
				</td>
				<td>
					<select
						defaultValue={obj.bonus.value}
						onChange={(event)=> this.props.modifyDep(this.props.name,[index,'bonus'],event.target.value)}>
						{this.typeOptions(bonusKeys())}
					</select>
				</td>
				<td>
					{calcValue(obj)}
				</td>
			</tr>
		);

	}
	printFlat(obj, index){
		//this seems a bit inconsistent, consider a better approach
		let totalPath = getPathFromName(this.props.name);
		totalPath.push('dependsOn', index, 'total');
		let typePath = getPathFromName(this.props.name);
		typePath.push('dependsOn', index, 'type'); 
		return(
			<tr key={index+"-flat-"+this.props.name}>
				{this.useSelect(obj, index)}
				<td>
					<EditableValue
						input="string"
						key={index + "-"+ this.props.name + "-type"}
						name={typePath}
						value={obj.type.value}
						editing={obj.type.editing}
						editValue={this.props.editValue}
						saveValueEdit={this.props.saveValueEdit}	
						length="10" />
				</td>
				<td>
					<EditableValue
						input="number"
						key={index + "-"+ this.props.name + "-total"}
						name={totalPath}
						value={obj.total.value}
						editing={obj.total.editing}
						editValue={this.props.editValue}
						saveValueEdit={this.props.saveValueEdit}	
						length="3" />
				</td>
			</tr>
		)  
	}
	printDie(obj, index){
		let diePath = getPathFromName(this.props.name).push('dependsOn', index,'die');
		let amountPath = getPathFromName(this.props.name).push('dependsOn', index, 'amount'); 
		return(
			<tr>
			{this.useSelect(obj, index)}
				<td>
					<EditableValue
						input="number"
						key={index + "-" + this.props.name + "-amount"}
						name={amountPath}
						value={obj.amount.value}
						editing={obj.amount.editing}
						editableValue={this.props.editableValue}
						saveValueEdit={this.props.saveValueEdit}
						length="4" />
				</td>
				<td>
					<EditableValue
						input="number"
						key={index + "-" + this.props.name + "-die"}
						name={diePath}
						value={obj.die.value}
						editing={obj.die.editing}
						editableValue={this.props.editableValue}
						saveValueEdit={this.props.saveValueEdit}
						length="4" />
				</td>
			</tr>
		)
	}
	useSelect(obj, index){
		return(
			<td key={index+"-use-"+obj.use.value}>
				<select
					defaultValue={obj.use.value}
					onChange={(event)=>this.props.changeUseType(this.props.name, index, event.target.value)}>
					{this.typeOptions(useKeys())}
				</select>
			</td>
		)
	}
	typeOptions(typeArray, keyAdd){
		return typeArray.map((key)=>{
			return <option key={key + "-" + keyAdd +"-dropwdown"} value={key}> {key} </option>
		})
	}
}
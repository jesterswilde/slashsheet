import React from 'react'; 
import path from '../util/paths.js'; 
import {useKeys, statKeys, bonusKeys, calcValue} from '../util/helpers.js'; 
import {getPathFromName, getStatFromPath} from '../util/paths.js'; 
import EditableValue from './editableValue.js'; 

export default class depStat extends React.Component{
	render(){
		let {obj, index} = this.props; 
		return this.printDep(obj, index);
	}
	printDep(obj, index){
		let path = this.props.name;
		if(typeof path !== 'object'){
			path = getPathFromName(path); 
		}
		let use = obj.use.value; 
		switch(use){
			case 'stat':
				return this.printStat(obj, index, path); 
			case 'flat':
				return this.printFlat(obj, index, path);
			case 'die':
				return this.printDie(obj, index, path); 
		}
	}
	printStat(obj, index, path){
		return(
			<tr>
				{this.useSelect(obj, index, path)}
				<td>
					<select
						defaultValue={obj.stat.value}
						onChange={(event)=>this.props.modifyDep(path, [index,'stat'], event.target.value)}>
						{this.typeOptions(statKeys())}
					</select>
				</td>
				<td>
					<select
						defaultValue={obj.bonus.value}
						onChange={(event)=> this.props.modifyDep(path ,[index,'bonus'],event.target.value)}>
						{this.typeOptions(bonusKeys())}
					</select>
				</td>
				<td>
					{calcValue(obj)}
				</td>
				{this.printRemoveButton(path, index)}
			</tr>
		);

	}
	printFlat(obj, index, path){
		//this seems a bit inconsistent, consider a better approach
		let totalPath = path.slice();
		totalPath.push('dependsOn', index, 'total');
		let typePath = path.slice();
		typePath.push('dependsOn', index, 'type'); 
		return(
			<tr key={index+"-flat-"+this.props.name}>
				{this.useSelect(obj, index, path)}
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
				{this.printRemoveButton(path, index)}
			</tr>
		)  
	}
	printDie(obj, index, path){
		let diePath = path.slice();
		diePath.push('dependsOn', index,'die');
		let amountPath = path.slice();
		amountPath.push('dependsOn', index, 'amount'); 
		return(
			<tr>
			{this.useSelect(obj, index, path)}
				<td>
					<EditableValue
						input="number"
						key={index + "-" + this.props.name + "-amount"}
						name={amountPath}
						value={obj.amount.value}
						editing={obj.amount.editing}
						editValue={this.props.editValue}
						saveValueEdit={this.props.saveValueEdit}
						length="4" />
					D
					<EditableValue
						input="number"
						key={index + "-" + this.props.name + "-die"}
						name={diePath}
						value={obj.die.value}
						editing={obj.die.editing}
						editValue={this.props.editValue}
						saveValueEdit={this.props.saveValueEdit}
						length="4" />
				</td>
				{this.printRemoveButton(path, index)}
			</tr>
		)
	}
	useSelect(obj, index, path){
		return(
			<td key={index+"-use-"+obj.use.value}>
				<select
					defaultValue={obj.use.value}
					onChange={(event)=>this.props.changeUseType(path, index, event.target.value)}>
					{this.typeOptions(useKeys())}
				</select>
			</td>
		)
	}
	printRemoveButton(path, index){
		console.log('remove', getStatFromPath(path)); 
		if(getStatFromPath(path).dependsOn.length > 1){
			return(
				 <td onClick={()=>this.props.removeDep(path, index)}>
				 	X
				 </td>
			)
		}
	}
	typeOptions(typeArray, keyAdd){
		return typeArray.map((key)=>{
			return <option key={key + "-" + keyAdd +"-dropwdown"} value={key}> {key} </option>
		})
	}
}
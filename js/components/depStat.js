import React from 'react'; 
import path from '../util/paths.js'; 
import {printStatValue, useKeys, statKeys, bonusKeys} from '../util/helpers.js'; 
import {updatePath, getValueObj} from '../util/paths.js'; 
import EditableValue from './editableValue.js'; 

export default class depStat extends React.Component{
	render(){
		let {obj, index, name:path} = this.props; 
		return this.printDep(obj, index, path);
	}
	printDep(obj, index, path){
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
		path = updatePath(path); 
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
					{printStatValue(obj)}
					
				</td>
				{this.printRemoveButton(updatePath(path,'dependsOn'), index)}
			</tr>
		);
	}
	printFlat(obj, index, path){
		//this seems a bit inconsistent, consider a better approach
		let totalPath = updatePath(path, 'dependsOn', index, 'total'); 
		let typePath = updatePath(path, 'dependsOn', index, 'type'); 
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
				{this.printRemoveButton(updatePath(path,'dependsOn'), index)}
			</tr>
		)  
	}
	printDie(obj, index, path){
		let diePath = updatePath(path, 'dependsOn', index,'die');
		let amountPath = updatePath(path, 'dependsOn', index, 'amount'); 
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
				{this.printRemoveButton(updatePath(path,'dependsOn'), index)}
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
		if(getValueObj(path)[1]){
			return(
				 <td onClick={()=>this.props.removeDep(path, index)}>
				 	<button className="btn"> X </button>
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
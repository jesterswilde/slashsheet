import React from 'react'; 
import {getDepStat, getValue, addPlus, bonusKeys, modKeys, calcValue, useKeys} from '../util/helpers.js'; 
import {getStatFromName, getPathFromName} from '../util/paths.js';
import EditableValue from './editableValue.js'; 



export default class dependentStatModal extends React.Component{
	render(){
		let {name, statObj, addDep,
			editValue, saveDepValueEdit} = this.props; 
		return (
			<div>
				<table className="table"><tbody>
					<tr>
						<td>
							{name}
						</td>
						{/* Stat Name */} 
						<td>
			  				<EditableValue 
				  				value={getDepStat(statObj)}
				  				editing={statObj.editing}
				  				input="number"	
					            editValue={editValue}
					            saveValueEdit={saveDepValueEdit}
					            length="3"
					            path={getPathFromName(name)}
				  				max="99" />
						</td>
					</tr>
					{/* Dependent Stat Table */}
				</tbody></table>
				<table className="table">
				<tbody>
					{this.printDepOptions(statObj)}
				<tr>
					{this.printPlayerModHead(statObj.playerMod)}
					{this.printPlayerModBody(statObj.playerMod)}
				</tr>
				<tr>
					<td>
						<button className="btn btn-primary"
							onClick={()=>addDep(getPathFromName(name))}>
							Add
						</button> 
					</td>
				</tr>
				</tbody>
				</table>
			</div>
		)
	}
	printDepOptions(names){
		return names.dependsOn.map((name,index)=>{
			return (
				<tr key={"statObj-name-"+name.name+"-"+index}>
				{this.optionTypes(name,index)} 
				{/* print the name*/}
				{this.useOptions(name.use.value)(name,index,this)}

				 {/* print thea actual value of the stat with mod type */}
					 {this.printValue(name, index)}
					 {this.printRemoveButton(this.props.name, index)}
			 </tr>
			 )

					})
	}
	optionTypes(depObj, index){
		return(
			<td>
				<select defaultValue={depObj.use.value}
					onChange={(event)=>this.props.modifyDep(getPathFromName(this.props.name), [index, "use"], event.target.value)}>
						{this.typeOptions(useKeys(), "use")}
				</select>
			</td>
		)
	}
	useOptions(use){
		switch(use){
			case 'flat':
				return this.optionUseFlat
			case 'stat':
				return this.optionUseStat
			case 'die':
				return this.optionUseDie
		}
	}
	optionUseFlat(depObj, index, t){
		console.log('flat',t);
		let results = []; 
		results.push(
			<td key={'flat-1-'+index}>
				Type:{depObj.type.value}
			</td>
			);
		results.push(
			<td key={'flat-2-'+index}>
				{addPlus(depObj.total.value)} 
			</td>
		)
		return results;
	}
	optionUseStat(depObj, index, t){
		let results = []; 
		results.push(
				<td key={'stat-1-'+index}> 
					<select defaultValue={name.name} 
					onChange={(event)=>t.props.modifyDep(path, [index,"name"], event.target.value)}>
						{t.typeOptions(bonusKeys(), "name")}
					</select>
				</td>
		)
		results.push(
			<td key={'stat-2-'+index}>
				<i>
					 <label className="formLabel">{'\u00A0'}</label> 
						<select defaultValue={name.type}
						onChange={(event)=>t.props.modifyDep(path, [index, "type"], event.target.value)}>
							{t.typeOptions(modKeys(), "type")}
						</select>
				</i>
			 </td>
		)
		return results; 
	}
	optionUseDie(depObj){

	}
	printValue(name, index){
		return (
			<td key={"statObj-value-"+index}> 
				{addPlus(calcValue(name))}
			</td>
		)

	}
	printPlayerModHead(playerMod){
		if(playerMod){
			return<th> Player Mod </th>
		}
	}
	printPlayerModBody(playerMod){
		if(playerMod){
			return <td> {addPlus(playerMod)} </td>
		}
	}
	printRemoveButton(name, index){
		if(getStatFromName(name).dependsOn.length > 1){
			return(
				 <td onClick={()=>this.props.removeDep(getPathFromName(name), index)}>
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
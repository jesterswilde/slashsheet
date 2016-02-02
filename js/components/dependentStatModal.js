import React from 'react'; 
import {getDepStat, getValue, addPlus, bonusKeys, modKeys, calcValue, useKeys} from '../util/helpers.js'; 
import {getStatFromName, getPathFromName} from '../util/paths.js';
import EditableValue from './editableValue.js'; 
import DepStat from './depStat.js'; 


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
					            name={name}
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
	printDepOptions(stat){
		return stat.dependsOn.map((obj, index) =>{
			return (
				<DepStat
					obj={obj}
					index={index}
					name={this.props.name}
					editValue={this.props.editValue}
					saveValueEdit={this.props.saveValueEdit}
					removeDep={this.props.removeDep}
					modifyDep={this.props.modifyDep}
					changeUseType={this.props.changeUseType} />
			)
		})
	}
	// optionType
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
	// printRemoveButton(name, index){
	// 	if(getStatFromName(name).dependsOn.length > 1){
	// 		return(
	// 			 <td onClick={()=>this.props.removeDep(getPathFromName(name), index)}>
	// 			 	X
	// 			 </td>
	// 		)
	// 	}
	// }
	// typeOptions(typeArray, keyAdd){
	// 	return typeArray.map((key)=>{
	// 		return <option key={key + "-" + keyAdd +"-dropwdown"} value={key}> {key} </option>
	// 	})
	// }
}
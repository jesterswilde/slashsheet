import React from 'react'; 
import {getDepStat, getValue, addPlus} from '../util/helpers.js'; 
import EditableValue from './editableValue.js'; 

export default class dependentStatModal extends React.Component{
	render(){
		return (
			<div>
				<table className="table"><tbody>
					<tr>
						<td>
							{this.props.name}
						</td>
						<td>
			  				<EditableValue 
				  				value={getDepStat(this.props.total)}
				  				editing={this.props.total.editing}
				  				input="number"	
				  				path={[this.props.name]}
					            editValue={this.props.editValue}
					            saveValueEdit={this.props.saveDepValueEdit}
					            length="3"
				  				max="99" />
						</td>
					</tr>
				</tbody></table>
				<table className="table">
				<thead><tr>
					{this.printNames(this.props.total)}
					{this.printPlayerModHead(this.props.total.playerMod)}
				</tr></thead>
				<tbody>
				<tr>
					{this.printValues(this.props.total)}
					{this.printPlayerModBody(this.props.total.playerMod)}
				</tr>
				</tbody>
				</table>
			</div>
		)
	}
	printNames(names){
		return names.dependsOn.map((name,index)=>{
			return (
			<th key={"modal-name-"+index}> {name.name} 
				<span><i>
					 <label className="formLabel">{'\u00A0'}</label> {name.type}
				</i></span>
			 </th>
			 )
		})
	}
	// printName(name){
	// 	if(typeof name.value === "number"){
	// 		return name.type
	// 	}
	// 	return name.value
	// }
	printValues(values){
		return values.dependsOn.map((value,index) =>{
			return <td key={"modal-value-"+index}> 
					{this.printValue(value)} 
				</td>
		})
	}
	printValue(value){
		if(typeof value.value === "number"){
			return addPlus(value.value);
		}
		return addPlus(getValue(value));
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
}
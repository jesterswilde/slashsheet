import React from 'react'; 
import {getDepStat, getStatFromPath, getValue, addPlus, isStat, bonusKeys, modKeys} from '../util/helpers.js'; 
import EditableValue from './editableValue.js'; 

export default class DependentStatModal extends React.Component{
	render(){

		return (
			<div>
				<table className="table"><tbody>
					<tr>
						<td>
							{this.props.name}
						</td>
						{/* Stat Name */} 
						<td>
			  				<EditableValue 
				  				value={getDepStat(this.props.modal)}
				  				editing={this.props.modal.editing}
				  				input="number"	
				  				path={[this.props.name]}
					            editValue={this.props.editValue}
					            saveValueEdit={this.props.saveDepValueEdit}
					            length="3"
				  				max="99" />
						</td>
					</tr>
					{/* Dependent Stat Table */}
				</tbody></table>
				<table className="table">
				<tbody>
					{this.printNames(this.props.modal)}
				<tr>
					{this.printPlayerModHead(this.props.modal.playerMod)}
					{this.printPlayerModBody(this.props.modal.playerMod)}
				</tr>
				<tr>
					<td>
						<button className="btn btn-primary"
							onClick={()=>this.props.addDep(this.props.path)}>
							Add
						</button> 
					</td>
				</tr>
				</tbody>
				</table>
			</div>
		)
	}
	printNames(names){
		return names.dependsOn.map((name,index)=>{
			let path = this.props.path.slice();
			path.push('dependsOn', index)
			return (
				<tr key={"modal-name-"+name.name+"-"+index}>
				{/* print the name*/}
				<td> 
					<select defaultValue={name.name} 
					onChange={(event)=>this.props.modifyDep(path, [index,"name"], event.target.value)}>
						{this.typeOptions(bonusKeys(), name.name, "name")}
					</select>
				</td>
				{/* print the mod type */}
				<td>
					<i>
						 <label className="formLabel">{'\u00A0'}</label> 
							<select defaultValue={name.type}
							onChange={(event)=>this.props.modifyDep(path, [index, "type"], event.target.value)}>
								{this.typeOptions(modKeys(), name.type, "type")}
							</select>
					</i>
				 {/* print thea actual value of the stat with mod type */}
				 </td>
				 {this.printValue(name, index)}
				 {this.printRemoveButton(this.props.path, index)}
				 </tr>
			 )
		})
	}
	printValue(value, index){
		/*If it's a stat, just get the stat's value */
		if(isStat(value.value)){
			return <td key={"modal-value-"+index}> 
						{addPlus(getValue(value))}
					</td>
		}else{
			/* If it's not tied to a stat, it should be editable */
			let path = this.props.path.slice(); 
			path.push('dependsOn', index);
			return(
			<td>
				<EditableValue
	  				value={value.value}
	  				editing={value.editing}
	  				input="number"	
	  				path={path}
		            editValue={this.props.editValue}
		            saveValueEdit={this.props.saveValueEdit}
		            length="3"
	  				max="99" />
  				</td>
				)
		}
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
	printRemoveButton(path, index){
		if(getStatFromPath(path).dependsOn.length > 1){
			return(
				 <td onClick={()=>this.props.removeDep(this.props.path, index)}>
				 	X
				 </td>
			)
		}
	}
	typeOptions(typeArray, current, keyAdd){
		return typeArray.map((key)=>{
		return <option key={key + "-" + keyAdd +"-dropwdown"} value={key}> {key} </option>
		})
	}
}
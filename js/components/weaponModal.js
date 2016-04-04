import React from "react"; 
import {printWeaponValue} from "../util/helpers.js"; 
import {updatePath, getValueObj} from '../util/paths.js'; 
import DepStat from './depStat.js'; 
import EditableList from './editableList.js'; 
import EditableValue from './editableValue.js'; 

export default class WeaponModal extends React.Component {
	render(){
		let {name, path, modal, addDep} = this.props;
		console.log('path', path, 'valueObj', getValueObj(updatePath(path, 'toHit'))); 
		let truncPath = path.slice(-1); 
		// let toHitPath = updatePath(path, 'toHit'); 
		// let damagePath = updatePath(path, 'damage'); 
		return(
			<div>
				<h2>
					<EditableValue
		  				value={modal.name.value}
		  				editing={modal.name.editing}
		  				input="text"	
			            editValue={this.props.editValue}
			            saveValueEdit={this.props.saveValueEdit}
			            length="20"
			            name={updatePath(path, 'name')} />
				</h2>
				<table className="table">
				<tbody>
					<tr><td>
						<EditableList
							editValue={this.props.editValue}
							saveValueEdit={this.props.saveValueEdit}
							obj={modal.tags}
							size={50}
							path={updatePath(path,'tags')} />
					</td>
					</tr>
				</tbody>
				</table>
				<table className="table">
					<thead><tr>
					<td> To Hit: {printWeaponValue(modal, 'toHit')} </td>	
					</tr></thead>
					<tbody>
						{this.printDeps(modal.toHit.dependsOn, updatePath(path, 'toHit'))}
						<tr>
							<td>
								<button className="btn btn-primary"
									onClick={()=>addDep(updatePath(path,'toHit', 'dependsOn'))}>
									Add
								</button> 
							</td>
						</tr>
					</tbody>
				</table>
				<table className="table">
					<thead><tr><td>
						Damage: {printWeaponValue(modal, 'damage')}
					</td></tr></thead>
					<tbody>
						{this.printDeps(modal.damage.dependsOn, updatePath(path, 'damage'))}
						<tr>
							<td>
								<button className="btn btn-primary"
									onClick={()=>addDep(updatePath(path,'damage', 'dependsOn'))}>
									Add
								</button> 
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
	printDeps(deps, path){
		return deps.map((obj, index) =>{
			return(
				<DepStat
					obj={obj}
					index={index}
					name={path}
					editValue={this.props.editValue}
					saveValueEdit={this.props.saveValueEdit}
					removeDep={this.props.removeDep}
					modifyDep={this.props.modifyDep}
					changeUseType={this.props.changeUseType} />
				)
		})
	}
}
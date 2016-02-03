import React from "react"; 
import {getDepStat, getValue, simplifyDamage} from "../util/helpers.js"; 
import {updatePath} from '../util/paths.js'; 
import DepStat from './depStat.js'; 
import EditableList from './editableList.js'; 
import EditableValue from './editableValue.js'; 

export default class WeaponModal extends React.Component {
	render(){
		let {name, path, modal} = this.props; 
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
							path={updatePath(path,'tags')} />


					</td>
					</tr>
				</tbody>
				</table>
				<table className="table">
					<thead><tr>
					<td> To Hit: {getDepStat(modal.toHit)} </td>	
					</tr></thead>
					<tbody>
						{this.printDeps(modal.toHit.dependsOn, updatePath(path, 'toHit'))}
					</tbody>
				</table>
				<table className="table">
					<thead><tr><td>
						Damage: {getDepStat(modal.damage)}
					</td></tr></thead>
					<tbody>
						{this.printDeps(modal.damage.dependsOn, updatePath(path, 'damage'))}
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
	printToHitDep(){
		return this.props.modal.toHit.dependsOn.map((stat, index)=>{
			return(
				<tr key={index + "-weapon-stat-dropdown"}>
					<td>
						{stat.name}
					</td>
					<td>
						{stat.type}
					</td>
					<td>
						{getValue(stat)}
					</td>
				</tr>
			)
		})
	}
	printDamage(){
		return this.props.modal.damage.map((source, index)=>{
			return(
				<tr key={index + "damage-weapon-modal"}>
					<td>{source.amount.value}</td>
					<td>{source.die.value}</td>
					<td>{source.type.value}</td>
				</tr>
			)
		})
	}
	printDamageMod(){
		return this.props.modal.damageMod.dependsOn.map((source, index)=>{
			return(
				<tr key={index + "-damage-mod-modal"}>
					<td>{source.name}</td>
					<td>{source.type}</td>
					<td>{getValue(source)}</td>
				</tr>
			)
		})
	}
}
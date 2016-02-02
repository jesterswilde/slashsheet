import React from "react"; 
import {getDepStat, getValue, simplifyDamage} from "../util/helpers.js"; 
import DepStat from './depStat.js'; 

export default class WeaponModal extends React.Component {
	render(){
		console.log('weapons modal',this.props);
		let {name, path, modal} = this.props; 
		let toHitPath = path.slice(); 
		toHitPath.push('toHit'); 
		let damagePath = path.slice(); 
		damagePath.push('damage'); 
		return(
			<div>
				{name}
				<table className="table">
				<tbody>
					<tr><td>{this.printTags()}</td></tr>
				</tbody>
				</table>
				<table className="table">
					<thead><tr>
					<td> To Hit: {getDepStat(modal.toHit)} </td>	
					</tr></thead>
					<tbody>
						{this.printDeps(modal.toHit.dependsOn, toHitPath)}
					</tbody>
				</table>
				<table className="table">
					<thead><tr><td>
						Damage: {getDepStat(modal.damage)}
					</td></tr></thead>
					<tbody>
						{this.printDeps(modal.damage.dependsOn, damagePath)}
					</tbody>
				</table>
			</div>
		)
	}
	printDeps(deps, path){
		console.log('deps', deps, 'path', path); 
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
	printTags(){
		return this.props.modal.tags.value.join(', '); 
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
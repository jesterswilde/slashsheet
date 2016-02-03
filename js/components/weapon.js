import React from 'react'; 
import {getDepStat, addPlus} from '../util/helpers.js'; 
import {getPathFromName, updatePath} from '../util/paths.js'; 

export default class Weapon extends React.Component{
	render(){
		let path = updatePath('weapons'); 
		return (
			<div>
				{this.weapons()}
				<div>
					<button className="btn btn-primary"
						onClick={()=>this.props.addDep(updatePath('weapons'),'weapon')}>
						Add
					</button>
				</div>
			</div>)
	}
	weapons(){
		return this.props.weapons.map((weapon, index)=>{
			let path = updatePath('weapons', index); 
			return(
				<table key={path.join('-')+'weapon-table'}
				onClick={()=>this.props.openModal(path, 'weapon')}>
				<thead><tr><th>
				{weapon.name.value}
				</th>
				<th onClick={(event)=>{
					event.stopPropagation(); 
					this.props.removeDep(updatePath('weapons'), index)}}>
					X
				</th>
				</tr></thead>
				<tbody><tr>
					<td>To Hit: {addPlus(getDepStat(weapon.toHit))} </td>
					<td> Damage: {getDepStat(weapon.damage)} </td> 
				</tr></tbody>
				</table>
			)	
		});
	}
}
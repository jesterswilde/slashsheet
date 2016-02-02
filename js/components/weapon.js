import React from 'react'; 
import {getDepStat, addPlus} from '../util/helpers.js'; 
import {getPathFromName} from '../util/paths.js'; 

export default class Weapon extends React.Component{
	render(){
		return (
			<div>
				{this.weapons()};
			</div>)
	}
	weapons(){
		return this.props.weapons.map((weapon, index)=>{
			let path = getPathFromName('weapons'); 
			path.push(index); 
			return(
				<table key={weapon.name.value+'-'+index+'weapon-table'}
				onClick={()=>this.props.openModal(path, 'weapon')}>
				<thead><tr><th>
				{weapon.name.value}
				</th></tr></thead>
				<tbody><tr>
					<td>To Hit: {addPlus(getDepStat(weapon.toHit))} </td>
					<td> Damage: {getDepStat(weapon.damage)} </td> 
				</tr></tbody>
				</table>
			)	
		});
	}
}
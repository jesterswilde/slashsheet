import React from 'react'; 
import {getDepStat, addPlus, simplifyDamage} from '../util/helpers.js'; 

export default class Weapon extends React.Component{
	render(){
		return (
			<table> 
			<tbody><tr><td>
			{this.weapons()}
			</td></tr></tbody>
			</table>
		);
	}
	weapons(){
		return this.props.weapons.map((weapon, index)=>{
			return(
				<table key={weapon.name.value+'-'+index+'weapon-table'}>
				<thead><tr><th>
				{weapon.name.value}
				</th></tr></thead>
				<tbody><tr>
					<td>To Hit: {addPlus(getDepStat(weapon.toHit))} </td>
					<td> Damage: {simplifyDamage(weapon.damage, weapon.damageMod)} </td> 
				</tr></tbody>
				</table>
			)	
		});
	}
}
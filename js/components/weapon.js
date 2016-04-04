import React from 'react'; 
import {getDepStat, addPlus, printWeaponValue} from '../util/helpers.js'; 
import {getPathFromName, updatePath} from '../util/paths.js'; 
import store from '../redux/store.js'; 


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
					let original = store.getState().weapons; 
					event.stopPropagation(); 
					this.props.removeDep(updatePath('weapons'), index);
					console.log(original === store.getState().weapons);
					console.log(store.getState())}}>
					<button className="btn"> X </button>
				</th>
				</tr></thead>
				<tbody><tr>
					<td> To Hit: {addPlus(printWeaponValue(weapon, 'toHit'))} </td>
					<td> Damage: {printWeaponValue(weapon, 'damage')} </td> 
				</tr></tbody>
				</table>
			)	
		});
	}
}
import React from 'react'; 
import {printStatValue, printDepValue} from '../util/helpers.js'; 
import EditableValue from './editableValue.js'; 

export default class CombatManeuver extends React.Component{
	render(){
		// console.log('cmb', this.props); 
		return(
			<div>
				<table className="table"> 
					<tbody>
					<tr>
						<td>BAB</td>
						<td><EditableValue 
			  				value={printStatValue('BAB')}
			  				editing={this.props.BAB.editing}
			  				input="number"
			  				name="BAB"
				            editValue={this.props.editValue}
				            saveValueEdit={this.props.saveValueEdit}
				            length="3"
			  				max="99" />
			  			</td>
					</tr>
					<tr onClick={()=>this.props.openModal('CMB','dependent')}>
						<td>CMB:</td>
						<td>{printDepValue(this.props.CMB)}</td>
					</tr>
					<tr>
						<td onClick={()=>this.props.openModal('CMD','dependent')}>CMD:</td>
						<td>{printDepValue(this.props.CMD)}</td>
					</tr>

					</tbody>
				</table>
			</div> 
		)
	}
}
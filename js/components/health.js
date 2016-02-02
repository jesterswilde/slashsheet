import React from 'react'; 
import EditableValue from './editableValue.js'; 

export default class Health extends React.Component{
	render(){
		// console.log('health', this.props);
		return (
			<table className = "table"> 
				<thead>
					<tr><th>HP</th></tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<EditableValue 
				  				value={this.props.HP.current.value}
				  				editing={this.props.HP.current.editing}
				  				input="number"	
				  				name='currentHP'
					            editValue={this.props.editValue}
					            saveValueEdit={this.props.saveValueEdit}
					            length="4"
				  				 />
						</td>
					</tr>
					<tr>
						<td>
							<EditableValue 
				  				value={this.props.HP.total.value}
				  				editing={this.props.HP.total.editing}
				  				input="number"	
				  				name="totalHP"
					            editValue={this.props.editValue}
					            saveValueEdit={this.props.saveValueEdit}
					            length="4"
				  				max="9999" />
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
	addToPath(value){
		let newPath = this.props.path.slice();
		newPath.push(value); 
		return newPath; 
	}
}
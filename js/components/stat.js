
import React from 'react';
import EditableValue from './editableValue.js'; 
import paths from '../util/paths.js'; 
import {printStatValue} from '../util/helpers.js'; 

class StatBlock extends React.Component{
	render(){
		return(
			<table className="table">
				<tbody>
					{this.allStats(this.props.stats)}
				</tbody>
			</table>
			)
	}
	allStats(statBlock){
	  	const rows = []; 
	  	for(var key in statBlock){
	  		let statKey = key; 
  			rows.push(
  				<tr key={statKey}><td>
  				{key}
  				</td><td>
  				<EditableValue 
	  				key={statKey+"-stat"}
	  				value={printStatValue(key)}
	  				editing={statBlock[key].editing}
	  				input="number"	
	  				name={key}
		            editValue={this.props.editValue}
		            saveValueEdit={this.props.saveValueEdit}
		            length="3"
	  				max="99" />
  				</td></tr>
  				)
  	}
  	return rows;
  }

}


export default StatBlock; 	
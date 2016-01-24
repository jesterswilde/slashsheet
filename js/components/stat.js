
import React from 'react';
import EditableValue from './editableValue.js'; 
import paths from '../util/paths.js'; 

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
	  		let path = paths[key].path; 
	  		let statKey = path.join('-'); 
  			rows.push(
  				<tr key={statKey}><td>
  				{key}
  				</td><td>
  				<EditableValue 
	  				key={statKey+"-stat"}
	  				value={statBlock[key].value}
	  				editing={statBlock[key].editing}
	  				input="number"	
	  				path={path}
		            editValue={this.props.editValue}
		            saveValueEdit={this.props.saveValueEdit}
		            length="3"
	  				max="99" />
  				</td></tr>
  				)
  	}
  	return rows;
  }

	// printStat(){
	// 	if(!this.props.stat.editing){
	// 		return (
	// 			<tr onClick = {() =>this.props.editStat(this.props.name, this.props.stat.value)}>
	// 		<td>
	// 		<b> {this.props.name} </b>
	// 		</td><td>
	// 		{this.props.stat.value}
	// 		</td>
	// 		</tr>)
	// 	}else{
	// 			return (
	// 				<tr>
	// 					<td>
	// 						{this.props.name}
	// 					</td>
	// 					<td className="form-group">
	// 						<input className="form-control" type="number" max={99} size={2}
	// 								defaultValue={this.props.stat.value} id={this.props.name} 
	// 								onBlur={() => this.props.saveStatEdit(this.props.name,this.getInput().value)}
	// 								onKeyDown={(event) => this.ifPressedenter(event.keyCode,this.props.name, this.getInput().value)}/>
	// 					</td>
	// 				<tr>
	// 				)
	// 	}
	// }
// 	componentDidUpdate(){
// 		if(this.props.stat.editing){
// 			this.getInput().focus(); 
// 		}
// 	}
// 	ifPressedenter(keycode, name, value){
// 		if(keycode===13){
// 			this.props.saveStatEdit(name, value); 	
// 		}
// 	}
// 	getInput(){
// 		console.log('input', document.getElementById(this.props.name).value); 
// 		return document.getElementById(this.props.name);
// 	}
}


export default StatBlock; 	

mport React from 'react';
import {getDepStat} from '../util/helpers.js';

export default class EditableDependency extends React.Component{
	render(){
		let {editing, dependsOn: statArray} = this.props.depObj;
		if(editing){
			return (
				<div>
					<input
						type="number">
						style={this.props.style()}
						defaulValue={getDepStat(statArray)}
						id=this.getID()
						
				</div>
			);
		}
	}
	style(){
		let results = {}; 
		if(this.props.length){
			results.width=this.props.length+"em";
		}
		return results
	}
	getID(){
		return this.props.path.join('-') + "-modal"; 
	}
	componentDidUpdate(){
		if(this.props.editing){
			this.getInput().focus(); 
		}
	}	
	ifPressedenter(keycode, name, value){
		if(keycode===13){
			this.props.saveValueEdit(name, value); 	
		}
	}
	getInput(){
		return document.getElementById(this.getID());
	}
}
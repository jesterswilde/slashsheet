import React from 'react'; 

export default class EditableList extends React.Component{
	render(){
		let{path, obj:{editing, value}} = this.props; 
		if(!editing){
			return (
				<span id={this.getID()} style={this.style()}
				onClick = {() =>this.props.editValue(path, value)}>
					{value.join(', ')}
				</span>
			)
		}
		return(
			<span>
			<input type='text' size={this.props.size || 10}
				defaultValue={value.join(', ')} id={this.getID()} 
				onBlur={() => this.saveString(path, this.getInput().value)}
				onKeyDown={(event) => this.ifPressedEnter(event.keyCode, path, this.getInput().value)}
				id={this.getID()}
				style={this.style()}/>
			</span>

		)
	}
	saveString(path, input){
		let results = input.split(',').map((string)=>string.trim());
		this.props.saveValueEdit(path, results);
	}
	style(){
		let results = {}; 
		if(this.props.length){
			results.width=this.props.length+"em";
		}
		return results
	}
	getID(){
		return this.props.path.join('-'); 
	}
	componentDidUpdate(){
		if(this.props.obj.editing){
			this.getInput().focus(); 
		}
	}	
	ifPressedEnter(keycode, path, input){
		if(keycode===13){
			this.saveString(path, input); 	
		}
	}
	getInput(){
		return document.getElementById(this.getID());
	}
}

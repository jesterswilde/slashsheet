import React from 'react'; 

export default class EditableValue extends React.Component{
	render(){
		if(!this.props.editing){
			return (
				<span id={this.getID()} style={this.style()}
				onClick = {() =>this.props.editValue(this.props.path, this.props.value)}>
					{this.props.value }
				</span>
			)
		}
		return(
			<span>
			<input type={this.props.input} max={this.props.max || 99} size={this.props.size || 2}
				defaultValue={this.props.value} id={this.getID()} 
				onBlur={() => this.props.saveValueEdit(this.props.path,this.getInput().value)}
				onKeyDown={(event) => this.ifPressedenter(event.keyCode,this.props.path, this.getInput().value)}
				id={this.getID()}
				style={this.style()}/>
			</span>

		)
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

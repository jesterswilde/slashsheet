import React from 'react'; 

export default class Modal extends React.Component{
	render(){
		console.log('rendering modal'); 
		return(
			<div className="modal" 
			onClick={this.props.closeModal}
			onKeyDown={(event) => this.pressedKey(event.keycode)}>
			</div>
		)
	}
	pressedKey(keycode){
		console.log('pressing keys');
		if(keycode === 13 || keycode === 27){
			this.props.closeModal(); 
		}
	}
	componentDidMount(){
		$(document.body).on('keydown',(event)=>this.pressedKey(event.keyCode));
	}
	//TODO -- make a cleaner, bound function so we can remove it specifically
	componentWillUnmount(){
		$(document.body).off('keydown');
	}
}

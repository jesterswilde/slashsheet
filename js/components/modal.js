import React from 'react'; 
import DependentStatModal from './dependentStatModal'; 

export default class Modal extends React.Component{
	render(){
		return(
			<div className="modal" 
			onClick={this.props.closeModal}
			onKeyDown={(event) => this.pressedKey(event.keycode)}>
				<div className="modalActive"
				onClick={(event)=>event.stopPropagation()}>
					<DependentStatModal
						modifyDep = {this.props.modifyDep}
						addDep = {this.props.addDep}
						removeDep = {this.props.removeDep}
						editValue = {this.props.editValue}
						path={[this.props.name]}
						saveValueEdit = {this.props.saveValueEdit}
						saveDepValueEdit = {this.props.saveDepValueEdit}
						name={this.props.name}
						total={this.props.total} /> 
				</div>
			</div>
		)
	}
	pressedKey(keycode){
		if(keycode ===13 && document.activeElement === document.body){
			this.props.closeModal(); 
		}
		if(keycode === 27){
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


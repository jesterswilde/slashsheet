import React from 'react'; 
import DependentStatModal from './dependentStatModal.js'; 
import modalRoutes from '../util/modalRoutes.js'; 

export default class Modal extends React.Component{
	render(){
		return(
			<div className="modal" 
			onClick={this.props.closeModal}
			onKeyDown={(event) => this.pressedKey(event.keycode)}>
				<div className="modalActive"
				onClick={(event)=>event.stopPropagation()}>
					{this.renderModal()}
				</div>
			</div>
		)
	}
	renderModal(){
		return modalRoutes[this.props.modalType]
			(this.props.path, this.props.name, this.props.modal, this.actions());
	}
	actions(){
		return {
			modifyDep: this.props.modifyDep,
			addDep: this.props.addDep,
			removeDep: this.props.removeDep, 
			editValue: this.props.editValue,
			saveValueEdit: this.props.saveValueEdit,
			saveDepValueEdit: this.props.saveDepValueEdit,
			changeUseType: this.props.changeUseType
		}
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


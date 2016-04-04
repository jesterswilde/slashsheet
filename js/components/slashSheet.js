import React from 'react'; 
import {connect} from 'react-redux'; 
import {mapDispatchToProps} from '../redux/actions.js'; 
import {getValueObj} from '../util/paths.js'; 
import StatBlock from './stat.js'; 
import EditableValue from './editableValue.js'; 
import CombatManeuver from './combatManeuver.js'; 
import Health from './health.js'; 
import Modal from './modal.js';
import Weapon from './weapon.js';
import Effect from './effect.js'; 


class SlashSheet extends React.Component{
	render(){
		return (
			<div className = "container">
	    	<h1><EditableValue 
                value={this.props.name.value}
                editing={this.props.name.editing}
                editValue={this.props.editValue}
                saveValueEdit={this.props.saveValueEdit}
                input="string"
                length="10"
                name="name" /></h1>
          <h2><EditableValue 
            value={this.props.title.value}
            editing={this.props.title.editing}
            editValue={this.props.editValue}
            saveValueEdit={this.props.saveValueEdit}
            input="string"
            name="title"
            length = "15"/></h2>
            <div className="row">
                <div className="col-sm-2 col-md-1">
                  <StatBlock key="stats" stats={this.props.stats}
                  editValue={this.props.editValue}
                  saveValueEdit={this.props.saveValueEdit} />
                </div>
                <div className="col-sm-2 col-md-1">
                  <CombatManeuver
                    CMB={this.props.CMB}
                    CMD={this.props.CMD}
                    BAB={this.props.BAB}
                    openModal={this.props.openModal}
                    editValue={this.props.editValue}
                    saveValueEdit={this.props.saveValueEdit}/>
                </div>
                <div className="col-sm-2 col-md-1">
                  <Health
                    HP={this.props.HP}
                    editValue={this.props.editValue}
                    saveValueEdit={this.props.saveValueEdit}/>
                </div>
                <div className="col-sm-4 col-md-3">
                    <Weapon
                        openModal={this.props.openModal}
                        weapons={this.props.weapons}
                        addDep={this.props.addDep}
                        removeDep={this.props.removeDep} />
                </div>
                <div>
                    <Effect
                        effects={this.props.effects} />
                </div>
              </div>
              {this.renderModal()}
			</div>
		)
	}
    renderModal(){
        const modal = this.props.modal; 
        if(modal.active){
            let stats;
            if(Array.isArray(modal.value)){
                stats= getValueObj(modal.value);
            }else{
                stats = getValueObj(modal.value); 
            }
            return(
                <Modal 
                    name = {modal.value}
                    modalType = {modal.modalType}
                    modal = {stats}
                    path = {modal.value}
                    addDep = {this.props.addDep}
                    removeDep = {this.props.removeDep}
                    saveValueEdit = {this.props.saveValueEdit}
                    saveDepValueEdit = {this.props.saveDepValueEdit}
                    editValue = {this.props.editValue}
                    modifyDep = {this.props.modifyDep}
                    changeUseType = {this.props.changeUseType}
                    closeModal={this.props.closeModal} />
            )
        }   
    }
}

export default connect(state => state, mapDispatchToProps)(SlashSheet); 
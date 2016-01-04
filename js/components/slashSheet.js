import React from 'react'; 
import {connect} from 'react-redux'; 
import {mapDispatchToProps} from '../redux/actions.js'; 
import {getStatFromPath} from '../util/helpers.js'; 
import StatBlock from './stat.js'; 
import EditableValue from './editableValue.js'; 
import CombatManeuver from './combatManeuver.js'; 
import Health from './health.js'; 
import Modal from './modal.js';
import Weapon from './weapon.js';


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
                path={['name']} /></h1>
          <h2><EditableValue 
            value={this.props.title.value}
            editing={this.props.title.editing}
            editValue={this.props.editValue}
            saveValueEdit={this.props.saveValueEdit}
            input="string"
            path={['title']} 
            length = "15"/></h2>
            <div className="row">
                <div className="col-sm-2 col-md-1">
                  <StatBlock key="stats" stats={this.props.stats} path={['stats']}
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
                    path={['HP']}
                    editValue={this.props.editValue}
                    saveValueEdit={this.props.saveValueEdit}/>
                </div>
                <div className="col-sm-4 col-md-3">
                    <Weapon
                        weapons={this.props.weapons} />
                </div>
              </div>
              {this.renderModal()}
			</div>
		)
	}
    renderModal(){
        const modal = this.props.modal; 
        if(modal.active){
        const stats = getStatFromPath(modal.value); 
            return(
                <Modal 
                name = {modal.value[modal.value.length-1]}
                path = {modal.value}
                modalType = {modal.modalType}
                modal = {stats}
                addDep = {this.props.addDep}
                removeDep = {this.props.removeDep}
                saveValueEdit = {this.props.saveValueEdit}
                saveDepValueEdit = {this.props.saveDepValueEdit}
                editValue = {this.props.editValue}
                modifyDep = {this.props.modifyDep}
                closeModal={this.props.closeModal} />
            )
        }   
    }
}

export default connect(state => state, mapDispatchToProps)(SlashSheet); 
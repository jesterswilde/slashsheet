/*jshint esnext:true */

import React from 'react'; 
import {connect} from 'react-redux'; 
import {mapDispatchToProps} from './actions.js'; 
import StatBlock from './stat.js'; 
import EditableValue from './editableValue.js'; 
import CombatManeuver from './combatManeuver.js'; 


class SlashSheet extends React.Component{
	render(){
    console.log('props', this.props);
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
              editValue={this.props.editValue} saveValueEdit={this.props.saveValueEdit} />
            </div>
            <div className="col-sm-2 col-md-1">
              <CombatManeuver
                CMB={this.props.CMB}
                CMD={this.props.CMD}
                BAB={this.props.BAB}
                editValue={this.props.editValue} saveValueEdit={this.props.saveValueEdit}/>
            </div>
          </div>
			</div>
		)
	}
}
export default connect(state => state, mapDispatchToProps)(SlashSheet); 
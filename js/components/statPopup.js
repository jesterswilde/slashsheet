import React from 'react'; 
import {getStatFromPath} from '../util/helpers.js'; 
export default class StatProp extends React.Component{
	render(){
		let {left, right, path} = this.props; 
		let style = {left:left+'px', top:top+'px'};
		let stat = getStatFromPath(path); 
		return(
			<div className="popup" style={style}>

			</div>
		);
	}
	statType(){
		let options = (this.stat)
		return(
			<select>

			</select>
		)
	}
}
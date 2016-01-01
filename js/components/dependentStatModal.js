import React from 'react'; 
import {getDepStat, getValue, addPlus} from '../util/helpers.js'; 

export default class dependentStatModal extends React.Component{
	render(){
		return (
			<div>
				<table className="table"><tbody>
					<tr>
						<td>
							{this.props.name}
						</td>
						<td>
							{getDepStat(this.props.total)}
						</td>
					</tr>
				</tbody></table>
				<table className="table">
				<thead><tr>
					{this.printNames(this.props.total)}
				</tr></thead>
				<tbody>
				<tr>
					{this.printValues(this.props.total)}
				</tr>
				</tbody>
				</table>
			</div>
		)
	}
	printNames(names){
		return names.dependsOn.map((name,index)=>{
			return <th key={"modal-name-"+index}> {this.printName(name)} </th>
		})
	}
	printName(name){
		if(typeof name.value === "number"){
			return name.type
		}
		return name.value
	}
	printValues(values){
		return values.dependsOn.map((value,index) =>{
			return <td key={"modal-value-"+index}> {this.printValue(value)} </td>
		})
	}
	printValue(value){
		if(typeof value.value === "number"){
			return addPlus(value.value);
		}
		return addPlus(getValue(value));
	}
}
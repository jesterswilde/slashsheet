import React from 'react'; 

export default class Effect extends React.Component{
	render(){
		let {effects} = this.props; 
		let effectsArray = effects.map((effect, index) => {
			return this.renderEffect(effect, index); 
		});
		return(
			<div>
				{effectsArray}
			</div>
		)
	}
	renderEffect(effect, index){
		let{name:{value:name}, type:{value:type}, active:{value:active}} = effect; 
		return(
			<table key={index+'-'+name+'-'+effect} className="table">
				<tbody>
					<tr><td>
						<b>{name}</b>
					</td>
					<td>
						Type:{type}
					</td></tr>
				</tbody>
			</table>
		)
	}
}
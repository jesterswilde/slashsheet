import paths from './paths.js'; 
import store from './store.js'; 

const getStat = function(statArray){
	console.log('statArray', statArray); 
	return statArray
	.map((stat) => {
		if(typeof stat.value === 'number'){
			return stat.value;
		}
		return getValue(stat); 
	})
	.reduce((total, current) => total + current);
};

const getValue = function(statObj){
	const {value: stat, type} = statObj; 	
	let path = paths[stat]; 
	let state = store.getState();
	for(var i = 0; i < path.length; i++){
		state = state[path[i]];
	}
	if(type === 'flat'){
		return Number(state.value); 
	}
	return Math.floor(Number(state.value)/2) - 5; 
};

export {getStat}; 
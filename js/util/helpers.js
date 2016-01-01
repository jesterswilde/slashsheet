import paths from './paths.js'; 
import store from '../redux/store.js'; 

//given an array of stat objects IE [{value:'str' type:'mod'} ...]
//will return the total value
const getDepStat = function(depObj){
	let statArray; 
	if(Array.isArray(depObj)){
		statArray=depObj; 
	}else{
		statArray = depObj.dependsOn; 
	}
	// console.log('depObj', depObj); 
	return statArray
	.map((stat) => {
		if(typeof stat.value === 'number'){
			return stat.value;
		}
		return getValue(stat); 
	})
	.reduce((total, current) => total + current);
};

//returns the value of the associated stat
const getValue = function(statObj){
	const {value: stat, type} = statObj; 	
	let path = paths[stat]; 
	let state = store.getState();
	// console.log('path', path, 'stat', stat, 'statObj', statObj); 
	for(var i = 0; i < path.length; i++){
		state = state[path[i]];
	}
	if(type === 'flat'){
		return Number(state.value); 
	}
	return Math.floor(Number(state.value)/2) - 5; 
};

//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
const buildPath = function(array, last){ 
	let original = {}; 
	let current = original; 
	for(var i = 0; i < array.length; i++){
		current = current[array[i]] = {}; 
	}
	Object.assign(current, last); 
	return original;
};

const addPlus = function(number){
	if(number > 0){
		return "+"+number;
	}
	return number; 
};

export {getDepStat, buildPath, getValue, addPlus}; 
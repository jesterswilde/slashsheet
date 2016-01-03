import paths from './paths.js'; 
import store from '../redux/store.js'; 



const getStatFromPath = function(path){
	let state = store.getState(); 
	for(var i = 0; i < path.length; i++){
		state = state[path[i]]; 
	}
	return state; 
};

//given an array of stat 	objects IE [{value:'str' type:'mod'} ...]
//will return the total value
const getDepStat = function(depObj, noMod){
	let {dependsOn: statArray, playerMod} = depObj;
	if(noMod){
		playerMod = 0; 
	}else{
		playerMod = playerMod || 0; 
	}
	return statArray
	.map((stat) => {
		if(typeof stat.value === 'number'){
			return stat.value;
		}
		return getValue(stat); 
	})
	.reduce((total, current) => total + current) + playerMod;
};

//returns the value of the associated stat
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

const pathKeys = function(){
	let results = []; 
	for(let key in path){
		results.push(key); 
	}
	return results; 
};

export {getDepStat, getStatFromPath, buildPath, getValue, addPlus,
	pathKeys}; 
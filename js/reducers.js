/*jshint esnext:true*/
import {INCREMENT_STAT, EDIT_STAT, SAVE_STAT_EDIT, EDIT_VALUE,
SAVE_VALUE_EDIT} from './actions'; 
var update = require('react-addons-update');

const reducer = function(state, action){
	// console.log('reducing', action, state); 
	switch(action.type){
		case INCREMENT_STAT:
			return incrementStat(state,action);
		case EDIT_STAT:
			return editStat(state,action); 
		case SAVE_STAT_EDIT:
			return saveEditStat(state,action); 
		case EDIT_VALUE:
			return editValue(state,action);
		case SAVE_VALUE_EDIT:
			return saveEditValue(state,action); 
		default:
			return identity(state); 
	}
};
const identity = function(state){
	// console.log('defaulted', state); 
	return state;
};
const incrementStat = function(state, action){
	const value = state.stats[action.stat] + action.amount; 
	return update(state, 
		{stats:{[action.name]:{$set: value}}});
};

const saveEditStat = function(state, action){
	return update(state,
		{stats:{[action.name]:{editing:{$set:null},
							value:{$set:action.value}}}});
};

const editStat = function(state, action){
	return update(state,
		{stats:{[action.name]:{editing:{$set:true}}}});
};

const editValue = function(state, action){
	const modState = buildPath(action.path, {editing:{$set:true}});
	return update(state, modState);
};

const saveEditValue = function(state, action){
	const modState = buildPath(action.path, {editing:{$set:null},
											value:{$set:action.value}});
	return update(state, modState); 
};

const buildPath = function(array, last){
	let original = {}; 
	let current = original; 
	for(var i = 0; i < array.length; i++){
		current = current[array[i]] = {}; 
	}
	Object.assign(current, last); 
	return original;
};

export {reducer}; 
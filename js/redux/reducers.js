import {INCREMENT_STAT, EDIT_STAT, SAVE_STAT_EDIT, EDIT_VALUE,
SAVE_VALUE_EDIT} from './actions'; 
import {buildPath} from '../util/helpers.js'; 

const update = require('react-addons-update');

const reducer = function(state, action){
	switch(action.type){
		case EDIT_VALUE:
			return editValue(state,action);
		case SAVE_VALUE_EDIT:
			return saveEditValue(state,action); 
		default:
			return identity(state); 
	}
};
const identity = function(state){
	return state;
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


export {reducer}; 
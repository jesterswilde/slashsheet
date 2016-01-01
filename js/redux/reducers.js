import {EDIT_VALUE, SAVE_VALUE_EDIT, SAVE_DEPVALUE_EDIT,
	OPEN_MODAL, CLOSE_MODAL} from './actions'; 
import {buildPath} from '../util/helpers.js'; 

const update = require('react-addons-update');

const reducer = function(state, action){
	switch(action.type){
		case EDIT_VALUE:
			return editValue(state,action);
		case SAVE_VALUE_EDIT:
			return saveEditValue(state,action); 
		case SAVE_DEPVALUE_EDIT:
			return saveDepValuEdit(state,action); 
		case OPEN_MODAL:
			return openModal(state, action);
		case CLOSE_MODAL:
			return closeModal(state, action); 
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

const openModal = function(state, action){
	return update(state, {modal:{active:{$set:true},
								value:{$set:action.value}}}); 
};

const closeModal = function(state, action){
	return update(state, {modal:{active:{$set:false}}});
};

export {reducer}; 
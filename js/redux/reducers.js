import {EDIT_VALUE, SAVE_VALUE_EDIT, SAVE_DEPVALUE_EDIT,
	OPEN_MODAL, CLOSE_MODAL, MODIFY_DEP, ADD_DEP, REMOVE_DEP} from './actions'; 
import {buildPath, getDepStat, getStatFromPath, isStat} from '../util/helpers.js'; 
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
		case MODIFY_DEP:
			return modifyDep(state, action); 
		case ADD_DEP:
			return addDep(state, action);
		case REMOVE_DEP:
			return removeDep(state, action);  
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
											value:{$set:Number(action.value)}});
	return update(state, modState); 
};

const saveDepValuEdit = function(state, action){
	const depObj = getStatFromPath(action.path); 
	const origTotal = getDepStat(depObj, true); 
	const dif = action.value - origTotal; 
	var modState; 
	if(!dif){
		modState = buildPath(action.path, {playerMod:{$set:null},
											editing:{$set:null}});
	}else{
		modState = buildPath(action.path, {playerMod:{$set:dif},									editing:{$set:null}});
	}
	return update(state, modState); 
};

const modifyDep = function(state, action){
	var modState;
	let {version, index, path, value} = action; 
	// path=path.slice(); //Might not be needed, double check that this is a new array
	// path.push('dependsOn', index); 
	if(version === "name"){
		if(isStat(value)){
			modState = buildPath(path, {name:{$set:value}, value:{$set:value}}); 
		}else{
			modState = buildPath(path, {name:{$set:value}, value:{$set:0}});
		}
	}
	if(version === "type"){
		modState = buildPath(path, {type:{$set:value}});
	} 
	return update(state, modState); 
};

const openModal = function(state, action){
	return update(state, {modal:{active:{$set:true},
								value:{$set:action.value}}}); 
};

const closeModal = function(state, action){
	return update(state, {modal:{active:{$set:false}}});
};

const addDep = function(state, action){
	let modState = buildPath(action.path, {dependsOn:{$push:
		[{name:"str", value:"str", type:"mod"}]}});
	return update(state, modState);
};	 

const removeDep = function(state, action){
	let newArray = getStatFromPath(action.path).dependsOn.slice();
	newArray.splice(action.index, 1); 
	let modState = buildPath(action.path, {dependsOn:{$set:newArray}});
	return update(state, modState);  
};

export {reducer}; 
import {EDIT_VALUE, SAVE_VALUE_EDIT, SAVE_DEPVALUE_EDIT,
	OPEN_MODAL, CLOSE_MODAL, MODIFY_DEP, ADD_DEP, REMOVE_DEP, CHANGE_USE_TYPE} from './actions'; 
import {buildPath, getDepStat, useDefaults} from '../util/helpers.js'; 
import {getStatFromPath, getPathFromName, getStatFromName} from '../util/paths.js'; 
const update = require('react-addons-update');

const reducer = function(state, action){
	switch(action.type){
		case EDIT_VALUE:
			return editValue(state,action);
		case SAVE_VALUE_EDIT:
			return saveEditValue(state,action); 
		case SAVE_DEPVALUE_EDIT:
			return saveDepValuEdit(state,action); 
		case MODIFY_DEP:
			return modifyDep(state, action); 
		case ADD_DEP:
			return addDep(state, action);
		case REMOVE_DEP:
			return removeDep(state, action);  
		case CHANGE_USE_TYPE:
			return changeUseType(state, action); 
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
	console.log(action.path); 
	return update(state, modState);
};

const saveEditValue = function(state, action){
	const modState = buildPath(action.path, {editing:{$set:null},
											value:{$set:action.value}});
	return update(state, modState); 
};

const saveDepValuEdit = function(state, action){
	const depObj = getStatFromName(action.name); 
	const origTotal = getDepStat(depObj, true); 
	const dif = action.value - origTotal; 
	var modState; 
	if(!dif){
		modState = buildPath(action.name, {playerMod:{$set:null},
											editing:{$set:null}});
	}else{
		modState = buildPath(action.name, {playerMod:{$set:dif},									editing:{$set:null}});
	}
	return update(state, modState); 
};

const modifyDep = function(state, action){
	let {modify, index, name, value} = action; 
	let path = getPathFromName(name);
	path.push('dependsOn',index);
	let modState = buildPath(path, {[modify]:{value:{$set:value}}}); 
	return update(state, modState); 
};


const addDep = function(state, action){
	let modState = buildPath(action.path, {dependsOn:{$push:
		[{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}]
	}});
	return update(state, modState);
};	 

const removeDep = function(state, action){
	let newArray = getStatFromPath(action.path).dependsOn.slice();
	newArray.splice(action.index, 1); 
	let modState = buildPath(action.path, {dependsOn:{$set:newArray}});
	return update(state, modState);  
};

const changeUseType = function(state, action){
	let {index, value, name} = action; 
	console.log('name',name); 
	let path = getPathFromName(name);
	path.push('dependsOn', index); 
	let defaultObj = useDefaults[value]; 
	let currentObj = getStatFromPath(path);
	let mergedObj = {use:{value:{$set:value}}};  
	for(var key in defaultObj){
		if(currentObj[key] === undefined){
			mergedObj[key] = {$set:{value:defaultObj[key].value}};
		}
	}
	let modState = buildPath(path, mergedObj); 
	return update(state, modState); 
};

const openModal = function(state, action){
	return update(state, {modal:{active:{$set:true},
								value:{$set:action.value},
								modalType:{$set:action.modalType}}}); 
};

const closeModal = function(state, action){
	return update(state, {modal:{active:{$set:false}}});
};

export {reducer}; 


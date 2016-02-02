const EDIT_VALUE = "EDIT_VALUE";
const SAVE_VALUE_EDIT = "SAVE_VALUE_EDIT";
const SAVE_DEPVALUE_EDIT = "SAVE_DEPVALUE_EDIT"; 
const OPEN_MODAL = "OPEN_MODAL"; 
const CLOSE_MODAL = "CLOSE_MODAL";
const MODIFY_DEP = "MODIFY_DEP"; 
const ADD_DEP = "ADD_DEP"; 
const REMOVE_DEP = "REMOVE_DEP"; 
const CHANGE_USE_TYPE = "CHANGE_USE_TYPE";

const editValue = function(path){
	return {	
		type: EDIT_VALUE,
		path,
	};
};

const saveValueEdit = function(path, value){
	return {
		type: SAVE_VALUE_EDIT,
		path,
		value
	};
};

const saveDepValueEdit = function(path, value){
	return {
		type: SAVE_DEPVALUE_EDIT,
		name:path,
		value
	};
};

const openModal = function(value, modalType){
	return{
		type: OPEN_MODAL,
		value,
		modalType
	};
};

const closeModal = function(event){
	return {
		type: CLOSE_MODAL
	};
};

const modifyDep = function(name, indexType, value){
	return{
		type: MODIFY_DEP,
		name,
		index:indexType[0], 
		modify:indexType[1],
		value
	};
};

const addDep = function(path){
	return{
		type: ADD_DEP,
		path
	};
};

const removeDep = function(path, index){
	return{
		type: REMOVE_DEP,
		path,
		index
	};
};

const changeUseType = function(name, index, value){
	return{
		type: CHANGE_USE_TYPE,
		name,
		index,
		value
	};
};

function mapDispatchToProps(dispatch) {		
  return {
    editValue: (path) => dispatch(editValue(path)),
    saveValueEdit: (path, value) => dispatch(saveValueEdit(path, value)),
    openModal: (value, modalType) => dispatch(openModal(value, modalType)),
    closeModal: (event) => dispatch(closeModal(event)),
    saveDepValueEdit: (path, value) => dispatch(saveDepValueEdit(path,value)),
    modifyDep: (path, version, value) => dispatch(modifyDep(path,version,value)),
    addDep: (path) => dispatch(addDep(path)),
    removeDep: (path, index) => dispatch(removeDep(path, index)),
    changeUseType: (name, index, value) =>dispatch(changeUseType(name, index, value))
  };
}

export {EDIT_VALUE, SAVE_VALUE_EDIT, OPEN_MODAL, CLOSE_MODAL,
	 SAVE_DEPVALUE_EDIT, MODIFY_DEP, ADD_DEP, REMOVE_DEP, CHANGE_USE_TYPE, mapDispatchToProps}; 
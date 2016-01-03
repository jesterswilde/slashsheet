const EDIT_VALUE = "EDIT_VALUE";
const SAVE_VALUE_EDIT = "SAVE_VALUE_EDIT";
const SAVE_DEPVALUE_EDIT = "SAVE_DEPVALUE_EDIT"; 
const OPEN_MODAL = "OPEN_MODAL"; 
const CLOSE_MODAL = "CLOSE_MODAL";
const MODIFY_DEP = "MODIFY_DEP"; 
const ADD_DEP = "ADD_DEP"; 
const REMOVE_DEP = "REMOVE_DEP"; 

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
		path,
		value
	};
};

const openModal = function(value){
	return{
		type: OPEN_MODAL,
		value
	};
};

const closeModal = function(event){
	return {
		type: CLOSE_MODAL
	};
};

const modifyDep = function(path, indexType, value){
	return{
		type: MODIFY_DEP,
		path,
		index:indexType[0], 
		version:indexType[1],
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

function mapDispatchToProps(dispatch) {		
  return {
    editValue: (path) => dispatch(editValue(path)),
    saveValueEdit: (path, value) => dispatch(saveValueEdit(path, value)),
    openModal: (value) => dispatch(openModal(value)),
    closeModal: (event) => dispatch(closeModal(event)),
    saveDepValueEdit: (path, value) => dispatch(saveDepValueEdit(path,value)),
    modifyDep: (path, version, value) => dispatch(modifyDep(path,version,value)),
    addDep: (path) => dispatch(addDep(path)),
    removeDep: (path, index) => dispatch(removeDep(path, index))
  };
}

export {EDIT_VALUE, SAVE_VALUE_EDIT, OPEN_MODAL, CLOSE_MODAL,
	 SAVE_DEPVALUE_EDIT, MODIFY_DEP, ADD_DEP, REMOVE_DEP, mapDispatchToProps}; 
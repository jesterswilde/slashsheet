const EDIT_VALUE = "EDIT_VALUE";
const SAVE_VALUE_EDIT = "SAVE_VALUE_EDIT";
const SAVE_DEPVALUE_EDIT = "SAVE_DEPVALUE_EDIT"; 
const OPEN_MODAL = "OPEN_MODAL"; 
const CLOSE_MODAL = "CLOSE_MODAL";

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

function mapDispatchToProps(dispatch) {
  return {
    editValue: (path) => dispatch(editValue(path)),
    saveValueEdit: (path, value) => dispatch(saveValueEdit(path, value)),
    openModal: (value) => dispatch(openModal(value)),
    closeModal: (event) => dispatch(closeModal(event)),
    saveDepValueEdit: (path, value) => dispatch(saveDepValueEdit(path,value))
  };
}

export {EDIT_VALUE, SAVE_VALUE_EDIT, OPEN_MODAL, CLOSE_MODAL,
	 SAVE_DEPVALUE_EDIT, mapDispatchToProps}; 
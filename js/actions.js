const EDIT_VALUE = "EDIT_VALUE";
const SAVE_VALUE_EDIT = "SAVE_VALUE_EDIT";
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

const openModal = function(){
	return{
		type: OPEN_MODAL
	};
};

const closeModal = function(){
	return {
		type: CLOSE_MODAL
	};
};

function mapDispatchToProps(dispatch) {
  return {
    editValue: (path) => dispatch(editValue(path)),
    saveValueEdit: (path, value) => dispatch(saveValueEdit(path, value)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal())
  };
}

export {EDIT_VALUE, SAVE_VALUE_EDIT, OPEN_MODAL, CLOSE_MODAL,
	 mapDispatchToProps}; 
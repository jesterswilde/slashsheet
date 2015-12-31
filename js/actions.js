const INCREMENT_STAT = "INCREMENT_STAT"; 
const EDIT_STAT = "EDIT_STAT";
const SAVE_STAT_EDIT = "SAVE_STAT_EDIT"; 
const INCREMENT_VALUE ="INCREMENT_VALUE";
const EDIT_VALUE = "EDIT_VALUE";
const SAVE_VALUE_EDIT = "SAVE_VALUE_EDIT";


const incrementStat = function(stat, amount = 1){
	return {
		type: INCREMENT_STAT,
		amount,
		stat
	};
};

const editStat = function(name, value){
	return {
		type: EDIT_STAT,
		name,
		value
	};
};

const saveStatEdit = function(name, value){
	return {
		type: SAVE_STAT_EDIT,
		name,
		value
	};
};

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

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: (stat, amount) => dispatch(incrementStat(stat, amount)),
    editStat: (name,value) => dispatch(editStat(name, value)),
    saveStatEdit: (name, value) => dispatch(saveStatEdit(name, value)),
    editValue: (path) => dispatch(editValue(path)),
    saveValueEdit: (path, value) => dispatch(saveValueEdit(path, value))
  };
}

export {INCREMENT_STAT, EDIT_STAT, SAVE_STAT_EDIT, EDIT_VALUE, SAVE_VALUE_EDIT,
	incrementStat, mapDispatchToProps}; 
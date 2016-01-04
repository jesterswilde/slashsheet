import React from 'react'; 
import DependentStatModal from '../components/DependentStatModal.js';
import {getStatFromPath} from "./helpers.js"; 

const modalRoutes = {
	dependent: function(path,name,modal, actions){
        return(
			<DependentStatModal
				modifyDep = {actions.modifyDep}
				addDep = {actions.addDep}
				removeDep = {actions.removeDep}
				editValue = {actions.editValue}
				saveValueEdit = {actions.saveValueEdit}
				saveDepValueEdit = {actions.saveDepValueEdit}
				path={path}
				name={name}
				modal={modal} /> 
        )
	},
	weapon: function(){

	}
};

export default modalRoutes; 
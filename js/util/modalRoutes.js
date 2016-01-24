import React from 'react'; 
import DependentStatModal from '../components/dependentStatModal.js';
import WeaponModal from '../components/WeaponModal.js';
import {getStatFromPath} from "./helpers.js"; 

/*
	Modal routes simplifies calling of a modal, mostly by letting you pass in
	actions object, and these functions taking the needed values. 
*/
const modalRoutes = {
	dependent: function(path, name, modal, actions){
        return(
			<DependentStatModal
				modifyDep = {actions.modifyDep}
				addDep = {actions.addDep}
				removeDep = {actions.removeDep}
				editValue = {actions.editValue}
				saveValueEdit = {actions.saveValueEdit}
				saveDepValueEdit = {actions.saveDepValueEdit}
				name={name}
				statObj={modal} /> 
        )
	},
	weapon: function(path, name, modal, actions){
		return (
				<WeaponModal 
				modifyDep = {actions.modifyDep}
				addDep = {actions.addDep}
				removeDep = {actions.removeDep}
				editValue = {actions.editValue}
				saveValueEdit = {actions.saveValueEdit}
				saveDepValueEdit = {actions.saveDepValueEdit}
				path={path}
				name={modal.name.value}
				modal={modal} /> 
		)
	}
};

export default modalRoutes; 
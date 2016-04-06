import paths from './paths.js'; 
import {bonuses, bonusTypes, updatePath, getValueObj} from './paths.js'; 
import store from '../redux/store.js'; 


/*
Externally, only 'print[Type]' functions should be called.
All 'print' functions call a similarly named 'get[Type]Total' function. 
These 'get' functions accept a string, array (referred to as a path), or an object
	If they are given a string or path, they use getValueObject to convert it to an object
getWeaponTotal relies on getDepTotal 
getDepTotal relies on getStatTotal

Refer to statDefaults for valueObject shape (it depends on the type)

All get functions return an object in the from of:
	{
		flat: 10 //Flat defaults to 0
		4: 6 //means 6D4
	}

*/


//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
//This is used in reducers, to update the store
const buildPath = function(pathArray, values, original = {}){ 
	pathArray = updatePath(pathArray); //convert to path, if it's a string
	let current = original; 
	for(var i = 0; i < pathArray.length; i++){
		//assign the next value to a blank object, unless it exists already.
		current = current[pathArray[i]] = current[pathArray[i]] || {}; 
	}
	Object.assign(current, values); 
	return original;
};

const addPlus = function(number){
	if(number > 0){
		return "+"+number;
	}
	return number; 
};

const statKeys = function(){
	let results = []; 
	for(let key in paths){
		if(paths[key].type === 'stat')
		results.push(key); 
	}	
	return results;
};

const allStatKeys = function(){
	let results = []; 
	for(let key in paths){
		if(paths[key].type === 'flat' || paths[key].type === 'dependent'){
			results.push(key); 
		}
	}
	return results; 
};

const bonusKeys = function(){
	let results = []; 
	for(let key in bonuses){
		results.push(key);
	}
	return results; 
};

const statDefaults = {
	stat:{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
	flat:{use:{value:'flat'}, total:{value:0}, type:{value:'rule'}}, 
	die:{use:{value:'die'}, amount:{value:1}, die:{value:6}, type:{value:'Weapon'}},
	weapon:{
		name:{value:'Dagger'},
		tags:{value:['melee']},
		toHit:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}},
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}
		]},
		damage:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
			{use:{value:'die'}, amount:{value:1}, die:{value:4}, type:{value:'Weapon Damage'}}
		]}
	}
};

const useKeys = function(){
	let results = [];
	for(var key in statDefaults){
		results.push(key);
	}
	return results; 
};

const getWeaponTotal = function(weaponObj, type, omitPlayerMod){
	if(type === undefined){
		throw "getWeaponTotal was passed undefined for 'type' (2nd argument)";
	}
	if(weaponObj === undefined){
		throw "getWeaponTotal was passed undefined for weaponObj (1st argument)"; 
	}
	let amount = getTagTotal(weaponObj.tag, type); 
	return combineValueObjs(amount, getDepTotal(weaponObj[type], omitPlayerMod));
};

const getDepTotal = function(depObj, omitPlayerMod){
	if(typeof depObj === "string" || Array.isArray(depObj)){
		depObj = getValueObj(depObj); 
	}
	if(depObj === undefined){
		throw "getDepTotal was passed undefined for depObj (1st argument)"; 
	}
	let {playerMod, dependsOn} = depObj;
	dependsOn = dependsOn || []; 
	playerMod = playerMod || 0; 
	if(omitPlayerMod){
		playerMod = 0; 
	}
	return dependsOn.reduce((total, current) => {
		return combineValueObjs(total, routeUse(current)); 
	},{flat: playerMod});
};

const getStatTotal = function(stat, useOnlyStat){
	if(typeof stat === 'string'){
		return getStatTotalFromName(stat, useOnlyStat); 
	}
	else{
		return getStatTotalFromValueObj(stat, useOnlyStat); 
	}
};

const getStatTotalFromName = function(stat, useOnlyStat){
	let statObj = {flat: getValueObj(stat).value}; 
	if(useOnlyStat){
		return statObj; 
	}
	else{
		return combineStatWithEffects(stat, statObj); 
	}
};

const getStatTotalFromValueObj = function(statObj, useOnlyStat){
	let {stat:{value:name}, bonus:{value:bonus}} = statObj;
	let statTotal = getStatTotalFromName(name);
	statTotal.flat = bonuses[bonus](statTotal.flat); 
	return statTotal;  
};

const combineStatWithEffects = function(statName, flatValueObj){
	let effectList = getValueObj('effects')[statName]; 
	for(let key in effectList){
		flatValueObj = combineValueObjs(flatValueObj, effectList[key]); 
	}
	return flatValueObj; 
};

const routeUse = function(useObj){
	switch (useObj.use.value){
		case 'flat':
			return {flat: useObj.total.value}; 
		case 'die':
			return {[useObj.die.value]: useObj.amount.value}; 
		case 'stat':
			return getStatTotal(useObj);
		default: 
			return 'error'; 
	}
};

const getTagTotal = function(tags, type){
	tags = tags || []; 
	if(type === undefined){
		return {flat:0};
	}
	let usedAlready = {}; 
	return tags.reduce((total, tag) => {
		let effectList = getValueObj('effects')[tag][type]; 
		for(let key in effectList){
			if(!usedAlready[key]){
				total = combineValueObjs(total, effectList[key]); 
				usedAlready[key] = true; 
			}
		}
		return total; 
	}, {flat:0}); 
};

const combineValueObjs = function(obj1 = {}, obj2 = {}){
	for(let key in obj2){
		let toMerge = obj2[key]; 
		if(obj1[key] === undefined){
			obj1[key] = toMerge; 
		}else{
			obj1[key] += toMerge; 
		}
	}
	return obj1; 
};

const printValueObj = function(printObj){
	//sorts the keys, and puts flat at the end.
	let sortedDice = Object.keys(printObj).sort((a,b) =>{
		if(isNaN(Number(b))){
			return -1; 
		}
		if(isNaN(Number(a))){
			return 1; 
		}
		return Number(b) - Number(a); 
	}); 
	return sortedDice.reduce((total, current) =>{
		if(Number(printObj[current]) === 0){
			return total; 
		}
		if(total !== ''){
			total+='+'; 
		}
		if(current === 'flat'){
			return total+= printObj[current]; 
		}
		return total+= printObj[current] +'D'+current; 
	}, '') || "0"; 
};

const printStatValue = function(stat, statOnly){
	return printValueObj(getStatTotal(stat, statOnly)); 
};

const printDepValue = function(depObj, omitPlayerMod){
	return printValueObj(getDepTotal(depObj, omitPlayerMod)); 
};

const printWeaponValue = function(weaponObj, type, omitPlayerMod){
	return printValueObj(getWeaponTotal(weaponObj, type, omitPlayerMod)); 
};

const registerEffect = function(path){
	let effectObj = getValueObj(path); 
	let {name:{value:name}, weapon:{tags:{value:tags}, stats, toHit, damage}} = effectObj;
 	let mergeObj = buildEffectMergeObj(name, stats, null); 
 	mergeObj = buildEffectMergeObj(name, tags)
};

const buildEffectMergeObj = function(name, effectArray, type, valueObj = {}){
	let clonedValueObj = cloneObj(valueObj); //this step might not be needed. but makes a new copy of obj
	if(type === undefined || type === null){//non weapons
		return effectArray.reduce((total, current) => {//merge them into one obj
			return buildPath(updatePath('effects', current), {[name]:clonedValueObj}, total); 
		},mergeObj);
	}else{
		return effectArray.reduce((total, current) => {
			return buildPath(updatePath('effects'), {current:{$merge:{[type]:{[name]:clonedValueObj}}}}, total); 
		},mergeObj);
	}
};

const removeEffectModObj = function(name, effectArray, type){
	//this leaves blank keys, consider a way to remove them. 
	if(type === undefined){
		return effectArray.reduce((total, current)=>{
			return buildPath(updatePath('effects', current), {[name]:{$set:undefined}}, total);
		},{});
	}else{
		return effectArray.reduce((total, current) =>{
			return buildPath(updatePath('effects', current), {[type]:{[name]:{$set:undefined}}});
		},{});
	}
};

const cloneObj = function(copyObj, origObj = {}){
	for(let key in copyObj){
		if(copyObj.hasOwnProperty(key)){
			let value = copyObj[key]; 
			if(typeof value === 'object'){
				if(Array.isArray(value)){
					origObj[key] = cloneObj(value, []);
				}else{
					origObj[key] = cloneObj(value, {}); 
				}
			}else{
				origObj[key] = value; 
			}
		}
	}
	return origObj; 
};

export {buildPath, addPlus, statKeys, allStatKeys, bonusKeys, useKeys, statDefaults,
getStatTotal, getTagTotal, printValueObj,
getWeaponTotal, combineValueObjs, getDepTotal, cloneObj,
printWeaponValue, printDepValue, printStatValue}; 
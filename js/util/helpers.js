import paths from './paths.js'; 
import {bonuses, bonusTypes, getStatFromName, updatePath} from './paths.js'; 
import store from '../redux/store.js'; 



const calcUseFlat = function(useObj){
	return useObj.total.value; 
};


const calcUseStat = function(useObj){
	let {bonus:{value:bonus}, stat:{value:stat}} = useObj;
	return bonuses[bonus](getStatFromName(stat).value);
};

const calcUseDie = function(useObj){
	return {amount: useObj.amount.value, die: useObj.die.value}; 
};

const use = {
	flat: calcUseFlat,
	stat: calcUseStat,
	die: calcUseDie
};
//returns the value of the associated stat
const calcValue = function(statObj){
	return use[statObj.use.value](statObj); 
};

//given an array of stat 	objects IE [{value:'str' type:'bonuses'} ...]
//will return the total value
const getDepStat = function(depObj, noMod){
	let {dependsOn: statArray, playerMod} = depObj;
	if(noMod){ //players are allowed to modify a stat without deriving that value
		playerMod = 0; //this is called playerod
	}else{
		playerMod = playerMod || 0; 
	}
	return calcDepStat(statArray, playerMod); 
	//sum flat numbers, and build an object of the different dice types. 
	let values = statArray.reduce((total, current) =>{
		let stat = calcValue(current); 
		if(typeof stat === 'number'){
			total.flat+=stat; 
		}else{
			total.dice[stat.die] = total.dice[stat.die] || 0; 
			total.dice[stat.die] += stat.amount; 
		}return total; 
	}, {dice:{}, flat:0});
	//sort the dice types for easy printing, then start printing
	let sortedDice = Object.keys(values.dice).sort((a,b) => b - a); 
	let result = sortedDice.reduce((total, current) =>{
		if(total !== ''){
			total+='+'; 
		}
		return total+=values.dice[current] +'D'+current; 
	}, ''); 
	if(result !== '' && (values.flat + playerMod !== 0)){//if there are dice and flat
		result +='+';
	}if(values.flat + playerMod !== 0){//if there are flat
		result += (values.flat + playerMod); 
	}
	return result; 
};

const calcDepStat = function(statArray, startingValue = 0){
	//sum flat numbers, and build an object of the different dice types. 
	let values = statArray.reduce((total, current) =>{
		let stat = calcValue(current); 
		if(typeof stat === 'number'){
			total.flat+=stat; 
		}else{
			total.dice[stat.die] = total.dice[stat.die] || 0; 
			total.dice[stat.die] += stat.amount; 
		}return total; 
	}, {dice:{}, flat:startingValue});
	//sort the dice types for easy printing, then start printing
	let sortedDice = Object.keys(values.dice).sort((a,b) => b - a); 
	let result = sortedDice.reduce((total, current) =>{
		if(total !== ''){
			total+='+'; 
		}
		return total+=values.dice[current] +'D'+current; 
	}, ''); 
	if(result !== '' && (values.flat + playerMod !== 0)){//if there are dice and flat
		result +='+';
	}if(values.flat + playerMod !== 0){//if there are flat
		result += (values.flat + playerMod); 
	}
	return result; 
};


//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
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

const getWeaponValue = function(weaponObj, type, omitPlayerMod){
	if(type === undefined){
		throw "getWeaponValue was passed undefined for 'type' (2nd argument)";
	}
	if(weaponObj === undefined){
		throw "getWeaponValue was passed undefined for weaponObj (1st argument)"; 
	}
	let amount = getTagTotal(weaponObj.tag, type); 
	return combineValueObjs(amount, getDepValue(weaponObj[type], omitPlayerMod));
};

const getDepValue = function(depObj, omitPlayerMod){
	if(depObj === undefined){
		throw "getDepValue was passed undefined for depObj (1st argument)"; 
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

const printDepValue = function(depObj, omitPlayerMod){
	return printValueObj(getDepValue(depObj, omitPlayerMod)); 
};

const getStatTotal = function(stat, useOnlyStat){
	let statValue = {flat:getStatFromName(stat).value}; 
	if(useOnlyStat){
		return statValue;
	}
	let effectList = getStatFromName('effects')[stat];
	for(let key in effectList){
		statValue = combineValueObjs(statValue, effectList[key]); 
	}
	return statValue; 
};

const useFlat = function(useObj){
	return {flat: useObj.total.value}; 
};

const useDie = function(useObj){
	return {[useObj.die.value]: useObj.amount.value};
};

const routeUse = function(useObj){
	switch (useObj.use.value){
		case 'flat':
			return useFlat(useObj); 
		case 'die':
			return useDie(useObj); 
		case 'stat':
			let {flat} = getStatTotal(useObj.stat.value); 
			return {flat:bonuses[useObj.bonus.value](flat)};
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
		let effectList = getStatFromName('effects')[type][tag]; 
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
			return +1; 
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
			return total+=printObj[current]; 
		}
		return total+= printObj[current] +'D'+current; 
	}, '') || "0"; 
};

const registerEffectModObj = function(name, effectArray, valueObj, type){
	let clonedValueObj = cloneObj(valueObj); //this step might not be needed. 
	if(type === undefined){
		return effectArray.reduce((total, current) => {
			return buildPath([current], {[name]:clonedValueObj}, total); 
		},{});
	}else{
		return effectArray.reduce((total, current) => {
			return buildPath([current], {[type]:{[name]:clonedValueObj}}, total); 
		},{});
	}
};

const removeEffectModObj = function(name, effectArray, type){
	if(type === undefined){
		return effectArray.reduce((total, current)=>{
			return buildPath([current], {[name]:{$set:undefined}}, total);
		},{});
	}else{
		return effectArray.reduce((total, current) =>{
			return buildPath([current], {[type]:{[name]:{$set:undefined}}});
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

export {getDepStat, buildPath, addPlus, calcValue,
	statKeys, allStatKeys, bonusKeys, useKeys, statDefaults,
getStatTotal, getTagTotal, printValueObj, registerEffectModObj, removeEffectModObj,
getWeaponValue, getDepStat, combineValueObjs, getDepValue, cloneObj}; 
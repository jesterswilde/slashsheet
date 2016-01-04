import paths from './paths.js'; 
import {mod, bonusTypes} from './paths.js'; 
import store from '../redux/store.js'; 



const getStatFromPath = function(path){
	let state = store.getState(); 
	for(var i = 0; i < path.length; i++){
		state = state[path[i]]; 
	}
	return state; 
};

//given an array of stat 	objects IE [{value:'str' type:'mod'} ...]
//will return the total value
const getDepStat = function(depObj, noMod){
	let {dependsOn: statArray, playerMod} = depObj;
	if(noMod){
		playerMod = 0; 
	}else{
		playerMod = playerMod || 0; 
	}
	return statArray
	.map((stat) => {
		if(typeof stat.value === 'number' || !isStat(stat.value)){
			return stat.value;
		}
		return getValue(stat); 
	})
	.reduce((total, current) => total + current) + playerMod;
};



//returns the value of the associated stat
const getValue = function(statObj){
	const {value: stat, type} = statObj; 	
	let path = paths[stat]; 
	let state = store.getState();
	for(var i = 0; i < path.length; i++){
		state = state[path[i]];
	}
	return mod[type](state.value); 
};

//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
const buildPath = function(array, last){ 
	let original = {}; 
	let current = original; 
	for(var i = 0; i < array.length; i++){
		current = current[array[i]] = {}; 
	}
	Object.assign(current, last); 
	return original;
};

const addPlus = function(number){
	if(number > 0){
		return "+"+number;
	}
	return number; 
};

const isStat = function(statName){
	if(statKeys().indexOf(statName) >= 0){
		return true;
	}
	return false; 
};

const statKeys = function(){
	let results = []; 
	for(let key in paths){
		results.push(key); 
	}	
	return results;
};

const bonusKeys = function(){
	let results = statKeys(); 
	for(let i = 0; i < bonusTypes.length; i++){
		results.push(bonusTypes[i]); 
	}
	return results; 
};

const modKeys = function(){
	let results = []; 
	for(let key in mod){
		results.push(key);
	}
	return results; 
};

//this is super messy, consider refactoring for cleaner.
const simplifyDamage = function(damageArray, statDamageObj){
	let sortedDamageArray = damageArray.sort((a,b) => {
		if(a.die.value < b.die.value){
			return 1;
		}
		if(a.die.value > b.die.value){
			return -1;
		}	
	});
	let recent = {die:'first', amount:0}; 
	let results = ''; 
	let statDmg = getDepStat(statDamageObj); 
	for(let i = 0; i < sortedDamageArray.length; i++){
		const dmg = sortedDamageArray[i];
		//If it's a new die type
		if(dmg.die !== recent.die){
			//Don't add + the first time
			if(recent.die !== 'first'){
				if(results !== ''){
					results += '+';
				}
				results += recent.amount +"D"+ recent.die; 
			}
			//overwrite recent die
			recent.die = dmg.die.value;
			recent.amount = dmg.amount.value;
		}else{
			//it's the same die type
			recent.amount += dmg.amount.value; 
		}
	}
	if(recent.die !== 'first'){
		if(results !== ''){
			results += '+';
		}
		if(recent.die === 0){
			recent.amount += statDmg;
			results += recent.die + recent.amount; 
		}else{
			results+= recent.amount +"D"+ recent.die; 
			results += "+"+statDmg;
		}
	}else{
		results+=statDmg; 
	}
	return results; 
};

export {getDepStat, getStatFromPath, buildPath, getValue, addPlus,
	statKeys, modKeys, bonusKeys, isStat, simplifyDamage}; 
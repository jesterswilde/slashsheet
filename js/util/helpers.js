import paths from './paths.js'; 
import {bonuses, bonusTypes, getStatFromName} from './paths.js'; 
import store from '../redux/store.js'; 




const calcUseFlat = function(useObj){
	return useObj.total.value; 
};

const calcUseStat = function(useObj){
	let {bonus:{value:bonus}, stat:{value:stat}} = useObj;
	return bonuses[bonus](getStatFromName(stat).value);
};

const use = {
	flat: calcUseFlat,
	stat: calcUseStat
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
	return statArray
		.map((stat) => {
		let result = calcValue(stat);
		return result;  
		})
		.reduce((total, current) => total + current) + playerMod;
};




//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
const buildPath = function(name, values){ 
	if(typeof name === 'string'){
		name = paths[name].path;
	}
	let original = {}; 
	let current = original; 
	for(var i = 0; i < name.length; i++){
		current = current[name[i]] = {}; 
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


const useDefaults = {
	stat:{stat:{value:'str'}, bonus:{value:'mod'}},
	flat:{total:{value:'0'}, type:{value:'rule'}}, 
	die:{amount:{value:1}, die:{value:6}, type:{value:'Weapon'}}
};

const useKeys = function(){
	let results = [];
	for(var key in useDefaults){
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
		if(dmg.die.value !== recent.die){
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

export {getDepStat, buildPath, addPlus, calcValue,
	statKeys, allStatKeys, bonusKeys, simplifyDamage, useKeys, useDefaults}; 
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


//creates an object used for easy update()
//takes ['stat','str'] and returns {stat:{str:{}}}
const buildPath = function(name, values){ 
	console.log('build path', name);
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


export {getDepStat, buildPath, addPlus, calcValue,
	statKeys, allStatKeys, bonusKeys, useKeys, statDefaults}; 
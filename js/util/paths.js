import store from '../redux/store.js'; 



const paths = {
	str:{path:['stats', 'str'], type:'stat', storeAs:'number'},
	dex:{path:['stats', 'dex'], type:'stat', storeAs:'number'},
	con:{path:['stats', 'con'], type:'stat', storeAs:'number'},
	int:{path:['stats', 'int'], type:'stat', storeAs:'number'},
	wis:{path:['stats', 'wis'], type:'stat', storeAs:'number'},
	cha:{path:['stats', 'cha'], type:'stat', storeAs:'number'},
	BAB:{path:['BAB'], type:'stat', storeAs:'number'},
	CMB:{path:['CMB'], type:'dependent', storeAs:'dependent'}, 
	CMD:{path:['CMD'], type:'dependent', storeAs:'dependent'},
	effects:{path:['effects']},
	weapons:{path:['weapons'], type:'weapon', storeAs:'dependent'},
	currentHP:{path:['HP','current'], type:'health', storeAs:'number'},
	totalHP:{path:['HP','total'], type:'health', storeAs:'number'},
	name:{path:['name'], type:'name', storeAs:'string'},
	title:{path:['title'], type:'name', storeAs:'string'}
};

const getPathFromName = function(name){
	return paths[name].path.slice(); 
};

const getTypeFromName = function(name){
	return paths[name].type; 
};

const getStatFromPath = function(path){
	let state = store.getState(); 
	for(var i = 0; i < path.length; i++){
		state = state[path[i]]; 
	}
	return state; 
};

const getStatFromName = function(name){
	let path = getPathFromName(name); 
	return getStatFromPath(path);
};

const updatePath = function(path, ...args){
	if(typeof path === 'object' && args.length === 0){
		return path; 
	}
	if(typeof path !== 'object'){ 
		path = getPathFromName(path); 
	}
	path = path.slice(); 
	args.forEach((element)=>path.push(element)); 
	return path; 
};


const bonuses = {
	flat: (value) => value, 
	mod: (value) => Math.floor(value/2) - 5,
	'1.5 mod': (value) => Math.floor((Math.floor(value/2) - 5) * 1.5), 
	'0.5 mod': (value) => Math.floor((Math.floor(value/2) -5) * 0.5)
};



export default paths;

export {bonuses, getPathFromName, getTypeFromName, getStatFromName, getStatFromPath, updatePath}; 
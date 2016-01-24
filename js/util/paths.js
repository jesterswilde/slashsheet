import store from '../redux/store.js'; 

const paths = {
	str:{path:['stats', 'str'], type:'flat'},
	dex:{path:['stats', 'dex'], type:'flat'},
	con:{path:['stats', 'con'], type:'flat'},
	int:{path:['stats', 'int'], type:'flat'},
	wis:{path:['stats', 'wis'], type:'flat'},
	cha:{path:['stats', 'cha'], type:'flat'},
	BAB:{path:['BAB'], type:'flat'},
	CMB:{path:['CMB'], type:'dependent'}, 
	CMD:{path:['CMD'], type:'dependent'},
	weapon:{path:['weapon'], type:'weapon'}
};

const getPathFromName = function(name){
	return paths[name].path; 
};

const getTypeFromName = function(name){
	return paths[name].type; 
};

const getStatFromPath = function(path){
	console.log('path', path); 
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


const mod = {
	flat: (value) => value, 
	mod: (value) => Math.floor(value/2) - 5,
	'1.5 mod': (value) => Math.floor((Math.floor(value/2) - 5) * 1.5), 
	'0.5 mod': (value) => Math.floor((Math.floor(value/2) -5) * 0.5)
};


export default paths;

export {mod, getPathFromName, getTypeFromName, getStatFromName, getStatFromPath}; 
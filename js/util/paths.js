const paths = {
	str:['stats', 'str'],
	dex:['stats', 'dex'],
	con:['stats', 'con'],
	int:['stats', 'int'],
	wis:['stats', 'wis'],
	cha:['stats', 'cha'],
	BAB:['BAB'],
};
const bonusTypes = [
	'rule'
];

const mod = {
	flat: (value) => value, 
	mod: (value) => Math.floor(value/2) - 5
};

const depPaths = {
	CMB:['CMB'],
	CMD:['CMD']
};

export default paths;

export {depPaths, mod, bonusTypes}; 
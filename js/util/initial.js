const initialState  = {
	stats:{
		str:{value: 20}, dex:{value: 12}, con: {value: 15},
		 int:{value: 8}, wis:{value: 5}, cha:{value: 15}
	},
	HP:{
		total:{value:80},
		current:{value:80}
	},
	level:[{
		class:{value:"Barbarian"},
		level:{value:8}
	}],
	BAB:{value:8},
	CMB:{dependsOn: [
		{name:"BAB",value:"BAB", type:"flat"}, 
		{name:"str", value:"str", type:"mod"}]},
	CMD:{dependsOn: [
		{name:"BAB", value:"BAB", type:"flat"}, 
		{name:"str", value:"str", type:"mod"}, 
		{name:"dex",value:"dex", type:"mod"}, 
		{name:"rule",value:10, type:"flat"}]},
	status:[{
			name:{value:"Berzerk Rage"},
			str:{value:4},
			con:{value:4},
			meleeToHit:{value:2}
		},
		{
			name:{value:"Weapon Specialization (Battle Axe)"},
			weaponType:{value:["Battle Axe"]},
		}],
	weapons:[{
		name:{value:"Crunk's Battle Axe"},
		tags:{value:["battle axe", "melee"]}, 
		toHit:{dependsOn:[
			{value:"BAB", name:"BAB", type:"flat"},
			{value:"str", name:"str", type:"mod"}]},
		damageMod:{dependsOn:[{name:"str", value:"str", type:"1.5 mod"}]},
		damage:[{
			amount:{value:2},
			die:{value:12},
			type:{value:"Weapon Damage"}
			},
			{
			amount:{value:2},
			die:{value:0},
			type:{value:"enchantment"}
			},
			{
			amount:{value:1},
			die:{value:6},
			type:{value:"fire"}
			}]
	},
	{
		name:{value:"Unconcious Gnome"},
		tags:{value:["gnome", "melee"]},
		toHit:{dependsOn:[
			{value:"BAB", name:"BAB", type:"flat"},
			{value:"str", name:"str", type:"mod"}
		]},
		damageMod:{dependsOn:[{name:"str", value:"str", type:"mod"}]},
		damage:[
			{amount:{value:2}, die:{value:6}, type:{value:"Weapon Damage"}}
		]
	},
	{
		name:{value:"+1 Composite Longbow +2"},
		tags:{value:['ranged']},
		toHit:{dependsOn:[
			{value:"BAB", name:"BAB", type:"flat"},
			{value:"dex", name:"dex", type:"mod"}	
		]},
		damageMod:{dependsOn:[{name:"dex", value:"dex", type:"mod"}]},
		damage:[
			{amount:{value:1}, die:{value:8}, type:{value:"Weapon Damage"}},
			{amount:{value:1}, die:{value:0}, type:{value:"enchantment"}},
			{amount:{value:2}, die:{value:0}, type:{value:"strength"}}
		]
	}],
	name: {value:"Crunk"},
	title: {value:"Barbarian of the Frozen Wastes"}, 
	modal:{active: false}
};

export default initialState; 
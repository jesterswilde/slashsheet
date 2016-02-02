const initialState  = {
	stats:{
		str:{value: 20},
		dex:{value: 12},
		con:{value: 15},
		int:{value: 8},
		wis:{value: 5},
		cha:{value: 15}
	},
	HP:{
		total:{value:80},
		current:{value:80}
		},
	level:[{
		class:{value:'Barbarian'},
		level:{value:8}
	}],
	BAB:{value:8},
	CMB:{dependsOn: [
		{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}}, 
		{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}
	]},
	CMD:{dependsOn: [
		{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}}, 
		{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}, 
		{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'mod'}}, 
		{use:{value:'flat'}, total:{value:10}, type:{value:'rule'}}
	]},
	status:[{
			name:{value:'Berzerk Rage'},
			type:{value:'Morale'},
			stats:{
				str:{use:{value:'flat'}, total:{value:4}},
				con:{use:{value:'flat'}, total:{value:4}},
			},
			weapons:{
				affects:{value:['melee']},
				toHit:{dependsOn:[
					{use:{value:'flat'}, total:{value:2}}
				]}
			}
		},
		{
			name:{value:'Weapon Specialization (Battle Axe)'},
			type:{value:'bonus'},
			weapons:{
				affects:{value:['battle axe']},
				toHit:{dependsOn:[
					{use:{value:'flat'}, total:{value:1}}
				]},
				damage:{dependsOn:[
					{use:{value:'flat'}, total:{value:2}}
				]}
			}
		}],
	weapons:[{
		name:{value:'Crunk\'s Battle Axe'},
		tags:{value:['battle axe', 'melee']}, 
		toHit:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}},
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}
		]},
		damage:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'1.5 mod'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:12}, type:{value:'Weapon Damage'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:6}, type:{value:'enchantment'}},
			{use:{value:'die'}, amount:{value:1}, die:{value:6}, type:{value:'fire'}
			}]
		}
	},
	{
		name:{value:'Unconcious Gnome'},
		tags:{value:['gnome', 'melee']},
		toHit:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}},
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}}
		]},
		damage:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:6}, type:{value:'Weapon Damage'}}
		]}
	},
	{
		name:{value:'+1 Composite Longbow +2'},
		tags:{value:['ranged']},
		toHit:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'BAB'}, bonus:{value:'flat'}},
			{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'mod'}}	
		]},
		damage:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'mod'}},
			{use:{value:'die'}, amount:{value:1}, die:{value:8}, type:{value:'Weapon Damage'}},
			{use:{value:'die'}, amount:{value:1}, die:{value:6}, type:{value:'enchantment'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:6}, type:{value:'strength'}}
		]}
	}],
	name: {value:'Crunk'},
	title: {value:'Barbarian of the Frozen Wastes'}, 
	modal:{active: false}
};

export default initialState; 
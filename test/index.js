let expect = require('chai').expect; 
let sinon = require('sinon'); 
import {getWeaponValue, getDepValue, getStatTotal, getTagTotal, combineValueObjs,
 printValueObj, registerEffectModObj, removeEffectModObj, buildPath, cloneObj} from '../js/util/helpers.js';  
import initial from '../js/util/initial.js'; 
const update = require('react-addons-update');




describe('combineValueObjs', function(){
	it('should add flat values together', function(){
		expect(combineValueObjs({flat:10}, {flat:14})).to.eql({flat:24});
	});
	it('should combine unequal values', function(){
		expect(combineValueObjs({flat:8, 8:2}, {2:4})).to.eql({flat:8, 2:4, 8:2});
	});
	it('should combine equal and unequal values', function(){
		expect(combineValueObjs({flat:8, 4:3, 3:9}, {flat:2, 2:9, 3:12})).to.eql({flat:10,2:9,3:21,4:3});
	});
});

describe('getStatTotal',function(){
	initial.stats = {str:{value:3}, dex:{value:8}}; 
	it('should read a stat without effects', function(){
		expect(getStatTotal('str')).to.eql({flat:3}); 
		expect(getStatTotal('dex')).to.eql({flat:8}); 
	});
	it('should read stats with effects', function(){
		initial.effects.str = {attack:{flat:10, 3:5},
								other:{3:9,10:10}}; 
		expect(getStatTotal('str')).to.eql({flat:13, 3:14, 10:10}); 
	});
	it('should be able to skip effects by passing true', function(){
		expect(getStatTotal('str', true)).to.eql({flat:3});
	});
});
	

describe('getTagTotal',function(){
	it('should look up tags', function(){
		initial.effects = {toHit:{melee:{other:{flat:4, 4:4}},
									light:{hello:{flat:10}}}};
		expect(getTagTotal(['light','melee'], 'toHit')).to.eql({flat:14, 4:4});
	});
	it('should ignore duplicate tags', function(){
		initial.effects = {toHit:{melee:{other:{flat:4, 4:4}},
									light:{other:{flat:4, 4:4}}}};
		expect(getTagTotal(['light','melee'], 'toHit')).to.eql({flat:4, 4:4});
	});
	it('should function when passed no arguments', function(){
		expect(getTagTotal()).to.eql({flat:0}); 
	});
});


describe('printValueObj', function(){
	it('should print sorted lists of dice', function(){
		expect(printValueObj({4:5,2:6})).to.equal("5D4+6D2"); 
	});
	it('should print only flat values', function(){
		expect(printValueObj({flat:30})).to.equal("30"); 
	});
	it('should put flat values after dice values', function(){
		expect(printValueObj({flat:10, 8:4, 9:3, 1:10})).to.equal("3D9+4D8+10D1+10"); 
	});
	it('should print 0 if given a blank object', function(){
		expect(printValueObj({})).to.equal("0"); 
	});
	it('should omit values that are 0', function(){
		expect(printValueObj({2:0, flat:0, 4:4})).to.equal("4D4"); 
	});
});

describe('getDepValue', function(){
	it('should get dep values, from just stat', function(){
		initial.stats = {str:{value:12}, dex:{value:4}}; 
		let dep = {dependsOn:[
				{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
				{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'flat'}}
		]};
		expect(getDepValue(dep)).to.eql({flat:5}); 
	});
	it('should get dep values, from just die', function(){
		let dep = {dependsOn:[
			{use:{value:'die'}, amount:{value:4}, die:{value:4}},
			{use:{value:'die'}, amount:{value:8}, die:{value:6}},
			{use:{value:'die'}, amount:{value:2}, die:{value:4}},
		]};
		expect(getDepValue(dep)).to.eql({4:6, 6:8, flat:0});
	});
	it('should get dep values, from just flat', function(){
		let dep = {dependsOn:[
			{use:{value:'flat'}, total:{value:10}}
		]};
		expect(getDepValue(dep)).to.eql({flat:10}); 
	});
	it('should get dep values from a mix', function(){
		initial.stats = {str:{value:14}, dex:{value:8}}; 
		let dep = {dependsOn:[
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'flat'}},
			{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'mod'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:2}},
			{use:{value:'die'}, amount:{value:1}, die:{value:2}},
			{use:{value:'die'}, amount:{value:2}, die:{value:4}},
			{use:{value:'flat'}, total:{value:12}},
			{use:{value:'flat'}, total:{value:10}}
		]};
		expect(getDepValue(dep)).to.eql({2:3, 4:2, flat:35});
	});
	it('should omit player mod if passed true for second argument', function(){
		let dep = {playerMod:-5, dependsOn:[
			{use:{value:'flat'}, total:{value:20}}
		]};
		expect(getDepValue(dep, true)).to.eql({flat:20}); 
	});
	it('should use player mod if not omitting', function(){
		let dep = {playerMod:6, dependsOn:[
			{use:{value:'flat'}, total:{value:4}}
		]};
		expect(getDepValue(dep)).to.eql({flat:10}); 
	});
});

describe('getWeaponValue', function(){
	it('should work with flat values only', function(){
		let wep = {toHit:{dependsOn:[
			{use:{value:'flat'}, total:{value:10}}
		]}};
		expect(getWeaponValue(wep, 'toHit')).to.eql({flat:10}); 
	});
	it('should work with stat values only', function(){
		initial.stats = {str:{value:12}, dex:{value:4}}; 
		let wep = {damage:{dependsOn:[
				{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
				{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'flat'}}
		]}};
		expect(getWeaponValue(wep, 'damage')).to.eql({flat:5});
	});
	it('should get wep values, from just dice', function(){
		let wep = {toHit:{dependsOn:[
			{use:{value:'die'}, amount:{value:4}, die:{value:4}},
			{use:{value:'die'}, amount:{value:8}, die:{value:6}},
			{use:{value:'die'}, amount:{value:2}, die:{value:4}},
			{use:{value:'die'}, amount:{value:5}, die:{value:10}},
			{use:{value:'die'}, amount:{value:12}, die:{value:8}},
			{use:{value:'die'}, amount:{value:2}, die:{value:8}},
		]}};
		expect(getWeaponValue(wep, 'toHit')).to.eql({4:6, 6:8, 10:5, 8:14, flat:0});
	});
	it('should get weapon values from a mix', function(){
		initial.stats = {str:{value:20}, dex:{value:4}}; 
		let wep = {damage:{dependsOn:[
			{use:{value:'stat'}, stat:{value:'str'}, bonus:{value:'mod'}},
			{use:{value:'stat'}, stat:{value:'dex'}, bonus:{value:'flat'}},
			{use:{value:'die'}, amount:{value:2}, die:{value:2}},
			{use:{value:'die'}, amount:{value:1}, die:{value:10}},
			{use:{value:'die'}, amount:{value:2}, die:{value:10}},
			{use:{value:'flat'}, total:{value:12}},
			{use:{value:'flat'}, total:{value:10}}
		]}};
		expect(getWeaponValue(wep, 'damage')).to.eql({2:2, 10:3, flat:31});
	});
});

describe('buildPath', function(){
	it('should build a path from an array', function(){
		expect(buildPath(['one','two','three'], {set:{value:5}})).to.eql({one:{two:{three:{set:{value:5}}}}});
	});
	it('should build a path from a string', function(){
		expect(buildPath('str', {what:'up'})).to.eql({stats:{str:{what:'up'}}});
	});
	it('should build a path with an independent merged object', function(){
		let mergeObj = {a:{b:{c:0}}};
		expect(buildPath(['one','two','three'], {value:10}, mergeObj)).to
			.eql({a:{b:{c:0}},one:{two:{three:{value:10}}}});
	});
	it('should build a path with similar paths', function(){
		let mergeObj = {a:{b:{c:10}}};
		expect(buildPath(['a','b','d'], {value:10}, mergeObj)).to.eql({a:{b:{c:10, d:{value:10}}}});
	});
});
describe('cloneObj', function(){
	it('should clone simple objects', function(){
		let obj = {a:'hello', b:2}; 
		expect(cloneObj(obj)).to.eql({a:'hello', b:2});
		expect(cloneObj(obj)).to.not.equal(obj); 
	});
	it('should clone complex objs with objs', function(){
		let obj = {a:'hello', b:2, c:{d:3,e:{f:{g:4}}}};
		expect(cloneObj(obj)).to.eql({a:'hello', b:2, c:{d:3,e:{f:{g:4}}}});
		expect(cloneObj(obj)).to.not.equal(obj); 
	});
	it('should clone complex objs with arrays', function(){
		let obj = {a:'hello', b:['c','d',{e:{f:['g','h'], i:['j'], k:'world'}}]};
		expect(cloneObj(obj)).to.eql({a:'hello', b:['c','d',{e:{f:['g','h'], i:['j'], k:'world'}}]});
		expect(cloneObj(obj)).to.not.equal(obj); 
	});
});
describe('registerEffectModObj', function(){
	it('should create an object for mutating stat effeects', function(){
		expect(registerEffectModObj('wham', ['str', 'dex', 'con'], {use:'what', type:'up'}))
			.to.eql({str:{wham:{use:'what', type:'up'}},
					dex:{wham:{use:'what', type:'up'}},
					con:{wham:{use:'what', type:'up'}}}); 
	});
	it('should create an object for mutating weapon effeects', function(){
		expect(registerEffectModObj('slash', ['light', 'melee'], {use:'what', type:'up'}, 'damage'))
			.to.eql({light:{damage:{slash:{use:'what', type:'up'}}},
					melee:{damage:{slash:{use:'what', type:'up'}}}}); 
	});
});
describe('removeEffectModObj', function(){
	// it('should update',function(){
	// 	let obj = {a:{b:'0'}}; 
	// 	let other = update(obj, {c:{$set:'d'}});
	// 	expect(update(obj, {c:{$set:'d'}})).to.not.equal(obj); 
	// 	expect(other.a).to.equal(obj.a);
	// });
	it('should remove an effect from a stat', function(){
		let obj = {str:{test:'hello', other:'world'}, dex:{test:'what', other:'up'}}; 
		let modObj = removeEffectModObj('other', ['str', 'dex']);
		expect(modObj).to.eql({str:{other:{$set:undefined}}, dex:{other:{$set:undefined}}});
		expect(update(obj, modObj)).to.eql({str:{test:'hello', other:undefined}, dex:{test:'what', other:undefined}});
	});
});

var thing = ['what','is','up','homie'];
var last = {$next: 'thing', $other: 'other'};  
function buildPath(array, last){
	original = {}; 
	current = original; 
	for(var i = 0; i < array.length; i++){
		current = current[array[i]] = {}; 
	}
	Object.assign(current, last); 
	return original;
}

console.log(buildPath(thing, last).what.is);
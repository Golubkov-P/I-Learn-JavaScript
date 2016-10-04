function deepEqual(object1, object2) {
	//base code of function
	if(object1 === object2) {
		return true;
	}

	if(Object.keys(object1).length !== Object.keys(object2).length) {
		return false;
	}

	if(!keysEqual(object1, object2)) {
		return false;
	}

	if(valuesEqual(object1, object2)) {
		return true;
	} else {
		return false;
	}

	//helper functions
	function keysEqual(obj1, obj2) {
		var keysOfObject1 = Object.keys(obj1),
				keysOfObject2 = Object.keys(obj2),
				result = true;

		keysOfObject1.forEach(function(item) {
			if(keysOfObject2.indexOf(item) === -1) {
				result = false;
			}
		});

		return result;
	}

	function valuesEqual(obj1, obj2) {
		var keys = Object.keys(obj1),
				result = true;

		for(var o = 0; o < keys.length; o++) {
			var key = keys[o];
			if( !typesEqual(obj1[key], obj2[key]) ) {
				result === false;
				break;
			}

			if ( !isObject(obj1[key], obj2[key]) && !isArray(obj1[key], obj2[key]) ) {
				result = obj1[key] === obj2[key];
			}

			if( isArray(obj1[key], obj2[key]) ) {
				result = arraysEqual(obj1[key], obj2[key]);
			}

			if( isObject(obj1[key], obj2[key]) ) {
				if( isDate(obj1[key], obj2[key]) ) {
					result = datesEqual(obj1[key], obj2[key]);
				} else {
					result = deepEqual(obj1[key], obj2[key]);
				}
			}

			if (!result) {
				break;
			}
		}

		return result;
	}

	function typesEqual(val1, val2) {
		return typeof val1 === typeof val2;
	}

	function arraysEqual(arr1, arr2) {
		if(arr1.length !== arr2.length) return false;

		var result = true;

		for(var i = 0; i < arr1.length; i++) {
			if( !typesEqual(arr1[i], arr2[i]) ) {
				result === false;
				break;
			}

			if ( !isObject(arr1[i], arr2[i]) && !isArray(arr1[i], arr2[i]) ) {
				if(arr1[i] !== arr2[i]) {
					result = false;
					break;
				}
			}

			if ( isArray(arr1[i], arr2[i]) ) {
				result = arraysEqual(arr1[i], arr2[i]);
			}

			if ( isObject(arr1[i], arr2[i]) ) {
				if( isDate(arr1[i], arr2[i]) ) {
					result = datesEqual(arr1[i], arr2[i]);
				} else {
					result = deepEqual(arr1[i], arr2[i]);
				}
			}	

			if (!result) {
				break;
			}
		}

		return result;
	}

	function datesEqual(date1, date2) {
		return date1.valueOf() === date2.valueOf();
	}

	function isObject(val1, val2) {
		return typeof val1 === 'object' && typeof val2 === 'object';
	}

	function isArray(val1, val2) {
		return typeof val1 === 'array' && typeof val2 === 'array';
	}

	function isDate(val1, val2) {
		return val1 instanceof Date && val2 instanceof Date;
	}
}

var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};

console.log(deepEqual(objA, objB));
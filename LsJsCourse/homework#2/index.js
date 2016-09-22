function isAllTrue(source, filterFn) {
	try {
		if (source.length === 0) throw new Error('Вы передали пустой массив, не надо так!!!');

		for (var i = 0; i < source.length; i++) {
			var result = true;
			if (filterFn(source[i]) != true) {
				result = false;
				break;
			}
		}

		return result
	} catch(e) {
		console.error(e.message);
	}
}

function isSomeTrue(source, filterFn) {
	try {
		if (source.length === 0) throw new Error('Вы передали пустой массив, не надо так!!!');

		for (var i = 0; i < source.length; i++) {
			var result = false;
			if (filterFn(source[i]) == true) {
				result = true;
				break;
			}
		}

		return result
	} catch(e) {
		console.error(e.message);
	}
}

function calculator(firstNumber) {
	function _sum() {
		var result = firstNumber;
		for (var i = 0; i < arguments.length; i++) {
			result += arguments[i];
		}
		return result
	}

	function _dif() {
		var result = firstNumber;
		for (var i = 0; i < arguments.length; i++) {
			result -= arguments[i];
		}
		return result
	}

	function _div() {
		try {
			var result = firstNumber;
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] == 0) {
					throw new Error('Нельзя делить на ноль! Измените аргументы!')
				}
				result = result / arguments[i];
			}
			return result
		} catch(e) {
			return e.message
		}
	}

	function _mul() {
		var result = firstNumber;
		for (var i = 0; i < arguments.length; i++) {
			result = result * arguments[i];
		}
		return result
	}

	return {
		sum: _sum,
		dif: _dif,
		div: _div,
		mul: _mul
	}
}

//test's block

var allNumbers = [1, 2, 4, 5, 6, 7, 8],
someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
noNumbers = ['это', 'массив', 'без', 'чисел'];

function isNumber(val) {
	return typeof val === 'number';
}

console.log(isAllTrue(allNumbers, isNumber)); //вернет true
console.log(isAllTrue(someNumbers, isNumber)); //вернет false
console.log(isAllTrue(noNumbers, isNumber)); //вернет false
isAllTrue([], isNumber); // выведет в консоль ошибку с текстом Вы передали пустой массив, не надо так!!!

console.log(isSomeTrue(allNumbers, isNumber)); //вернет true
console.log(isSomeTrue(someNumbers, isNumber)); //вернет true
console.log(isSomeTrue(noNumbers, isNumber)); //вернет false
isSomeTrue([], isNumber); // выведет в консоль ошибку с текстом Вы передали пустой массив, не надо так!!!

var myCalculator = calculator(100);

console.log(myCalculator.sum(1,2,3,4)); //110
console.log(myCalculator.dif(20, 50)); //30
console.log(myCalculator.div(2, 2)); //25
console.log(myCalculator.mul(2, 5)); //1000
console.log(myCalculator.div(2, 0)); //На ноль делить нельзя! Измените аргументы!
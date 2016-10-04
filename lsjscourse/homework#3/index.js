function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}

function filter(array, callback) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		if(callback(array[i])) {
			newArray[newArray.length] = array[i];
		}
	}
	return newArray;
}

function map(array, callback) {
	var newArray = [];
	for (var i = 0; i < array.length; i++) {
		newArray[i] = callback(array[i]);
	}
	return newArray;
}

function slice(array, begin, end) {
	var newArray = [];
	var endPoint = end || 0;
	if (endPoint < 0) {
		endPoint = array.length - 1 + end;
	} 
	for (var i = begin; i < endPoint; i++) {
		newArray[newArray.length] = array[i];
	}
	return newArray;
}

function reduce(array, callback, initialvalue) {

	//if values of array and intial value were not defined then return Error
	if (countOfDefineValues(array) === 0 && !initialvalue) {
		return new Error('TypeError');
	}

	//if unmount of array values = 1 
	//and intial value were not defined 
	//then return array value
	if(countOfDefineValues(array) === 1 && !initialvalue) {
		var result;
		for (var i = 0; i < array.length; i++) {
			if (array[i] !== undefined) {
				result = array[i];
			}
		}
		return result;
	}
	//if unmount of array values = 0
	//and intial value were defined 
	//then return initial value
	if (countOfDefineValues(array) === 0 && initialvalue) {
		return initialvalue;
	}

	//helper function 
	function countOfDefineValues(array) {
		var count = 0;

		if(array.length === 0) return count;

		for (var a = 0; a < array.length; a++) {
			if (array[a] !== undefined) {
				count++;
			}
		}
		return count;
	}

	//if initial value were not define
	//then initial = first of defined array's value
	if (!initialvalue) {
		var initial, begin;
		for (var b = 0; b < array.length; b++) {
			if (array[b] !== undefined) {
				initial = array[b];
				begin = b + 1;
				break;
			}
		}
	}

	//if initial value were define
	//then value initialvalue
	var value = initial || initialvalue,
			result = null; //default values of result

	for (var c =  begin || 0; c < array.length; c++) {
		if(array[c] !== undefined) {
			if(result) {
				result = callback(result, array[c], c, array);
			} else {
				result = callback(value, array[c], c, array);
			}
		}
	}

	return result;
}

function splice(array, begin, unmount) {
	var deletedArray = [],
			newElements = [],
  		shift = 0;
  //определяем количество новых элементов
  //и величину смещения
	if (arguments.length > 3) {
		for(var i = 3; i < arguments.length;i++) {
			newElements[newElements.length] = arguments[i];
		}
		shift = newElements.length;
	}
  
  //проверяем больше ли количество удаляемых элементов 
  //числа элементов с начальной точки
	if ((array.length) <= (begin + unmount)) {
		//заполняем массив удаленных элементов
		for (var i = begin; i < array.length; i++) {
			deletedArray[deletedArray.length] = array[i];
		}

		//удаляем элементы основного массива путем сокращения длинны
  	array.length = begin;

  	//если есть что добавить в основной массив - добавляем
  	if (shift) {
  		for (var j = 0; j < shift; j++) {
  			array[begin+j] = newElements[j];
  		}
  	}
  	//возвращаем массив удаленных элементов и заканчиваем выполнение скрипта
  	return deletedArray;
  }

  //если нечего удалять
  if (unmount === 0) {
  	//но есть что добавить
  	if(shift) {
  		//смещаем элементы начиная с begin на количество добавляемых элементов
  		//делаем с конца массива чтобы не удалить ничего
  		for (var i = array.length-1; i >= begin; i--) {
				array[i+shift] = array[i];
			}
			//добавляем новые элементы
			for (var j = 0; j < shift; j++) {
				array[begin+j] = newElements[j];
			}
			//раз ничего не удаляли вернется пустой массив
			return deletedArray;
  	} else {
  		//а если и добавить нечего возвращаем пустой массив
  		return deletedArray;
  	}
  }

  //теперь отрабатываем ситуацию когда удалять нужно
  //добавляем удаляемые элементы в массив удаленных
  for (var i = 0; i < unmount; i++) {
		deletedArray[i] = array[begin+i];
	}
	//перемещаем элементы с элемента следующего за последним удаленным
	//на величину смещения
	for (var j = begin+unmount; j < array.length; j++) {
		array[j-unmount] = array[j];
	}
	//удаляем лишние элементы основного массива путем сокращения длинны
	array.length = array.length-unmount;
	//проверяем надо ли добавить элемениы
	if(shift) {
  	//смещаем элементы начиная с begin на количество добавляемых элементов
  	//делаем с конца массива чтобы не удалить ничего
  	for (var l = array.length-1; l >= begin; l--) {
			array[l+shift] = array[l];
		}
		//добавляем новые элементы
		for (var g = 0; g < shift; g++) {
			array[begin+g] = newElements[g];
		}
  }
	//возвращаем массив удаленных элементов и заканчиваем выполнение скрипта
  return deletedArray;
}

var array = ['apple', 'orange', 'apricot', 'banana'],
		deleted = splice(array, 1, 2, 'wolf'),
		arrayNum = [1,2,3,4];

console.log(deleted);
console.log(array);
console.log(reduce(arrayNum, function(a, b) {
	return a + b;
}, 2));

function consoleRec(array, entryPoint) {
    console.log(array[entryPoint]);
    entryPoint++;
    if(array.length > entryPoint) {
        return consoleRec(array, entryPoint);
    }
}

var arr = ['я', 'умею', 'писать', 'рекурсивные', 'функции'];
consoleRec(arr, 0);
function prepend(container, newElement) {
  container.insertbefore(newElement, container.firstChild);
}

function deleteTextNodes(element) {
  var children = element.childNodes;

  for (var i = 0; i < children.length; i++) {
    if(children[i].nodeType === 3) {
     element.removeChild(children[i]);
     i--;
    } else {
      deleteTextNodes(children[i]);
    }
  }
}

function scanDOM() {
  var rootChildren = document.body.children,
      tags = {},
      id = {},
      classes = {},
      textNodes = 0,
      tagTemplate = 'Тегов ',
      idTemplate = 'Элементов с id ',
      classTemplate = 'Элементов с классом ',
      textTemplate = 'Текстовых узлов: ';

  for(var j = 0; j < rootChildren.length; j++) {
    if( rootChildren[j].nodeType === 3) {
      textNodes++;
    } else {
      scanElement(rootChildren[j]);
    }
  }

  print(tags, tagTemplate);
  print(id, idTemplate);
  print(classes, classTemplate);
  printTextNodes(textNodes, textTemplate);

  function scanElement(elem) {
    var elemTagName = elem.nodeName,
        elemClassList = elem.classList,
        elemId = elem.id,
        elemChildren = elem.childNodes;

    counter(tags, elemTagName);
    
    if(elemId) {
    	counter(id, elemId);
    }

    if(elemClassList) {
    	for (var i = 0; i < elemClassList.length; i++) {
      	counter(classes, elemClassList[i]);
    	}
    }
    
    for(var j = 0; j < elemChildren.length; j++) {
      if( elemChildren[j].nodeType === 3) {
      textNodes++;
      } else {
        scanElement(elemChildren[j]);
      }
    }
  }

  function counter(obj, value) {
    if(obj[value]) {
      obj[value] = obj[value] + 1;
    } else {
      obj[value] = 1;
    }
  }

  function print(obj, template) {
    for(var key in obj) {
      console.log(template + key + ': ' + obj[key]);
    }
  }

  function printTextNodes(count, template) {
    console.log(template + count);
  }
}


//test for deleteTextNodes function
var deleteButton = document.querySelector('#del');

deleteButton.addEventListener('click', function() {
  var container = document.querySelector('#container');
  deleteTextNodes(container);
});

//test for scanDOM function
var scanButton = document.querySelector('#scan');

scanButton.addEventListener('click', function() {
  scanDOM();
});
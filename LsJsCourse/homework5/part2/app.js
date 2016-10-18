(function() {
  var root = document.querySelector('#root'),
      button = document.querySelector('#add'),
      rootWidth = window.innerWidth,
      rootHeight = window.innerHeight;


  button.addEventListener('click', createDiv);
  window.addEventListener('mousedown', dragAndDrop);

  function createDiv() {
    var div = document.createElement('div'),
        divWidth = random(20, rootWidth/2),
        divHeight = random(20, rootHeight/2),
        divColor = '#' + random(0, 255).toString(16) + random(0, 255).toString(16) + random(0, 255).toString(16);
    
    div.className = 'draggable';
    div.style.width = divWidth + 'px';
    div.style.height = divHeight + 'px';
    div.style.left = random(0, rootWidth - divWidth) + 'px';
    div.style.top = random(0, rootHeight - divHeight) + 'px';
    div.style.backgroundColor = divColor;

    root.appendChild(div);
  };
  
  function dragAndDrop(e) {
    if (e.target.className === 'draggable') {
      var elem = e.target,
          mouseX = e.offsetX,
          mouseY = e.offsetY;

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', move);
      });

      function move(e) {
        elem.style.top = e.clientY - mouseY + 'px';
        elem.style.left = e.clientX - mouseX + 'px';
      }
    }
  }

  function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

})();
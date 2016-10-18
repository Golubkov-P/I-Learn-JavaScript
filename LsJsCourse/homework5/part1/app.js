(function() {
  var root = document.querySelector('#accordeon'),
      activeTab = document.querySelector('.active');

  root.addEventListener('click', function(e) {
  	
    if (e.target.className === 'accordeon__item-title') {
      var currentTab = e.target.parentNode;
      
      if ( activeTab !== currentTab ) {
        activeTab.classList.remove('active');
        currentTab.classList.add('active');

        activeTab = currentTab;
      }

    }

  });

})();

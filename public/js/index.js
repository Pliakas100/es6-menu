//function to create elements
function createNode(element) {
  return document.createElement(element);
}

//load the spinner 
function spinnerOn() {
  const main = document.querySelector('.main');
  const img = createNode('img');
  img.src = '/img/giphy.gif';
  img.classList.add('loading');
  main.append(img);
}

//delete the spinner
function spinnerOff() {
  const img = document.querySelector('.loading');
  img.remove();
}


//ajax call to get the menu data
function loadData() {
  spinnerOn();
  fetch('http://localhost:3000/data')
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      setTimeout(function(){
        spinnerOff();
        mountMenu(res.data)}
      , 200);
    });
}

//mount all the menu with the given elements
function mountMenu(defaultElements) {
  const main = document.querySelector('.main');
  const dl = createNode('dl');

  defaultElements.forEach( (tab, index) => {
    const dt = createDt(tab, index);
    dl.appendChild(dt);

    if (tab.length > 1) {
      for(i = 1; tab.length > i ; i++) {
        const dd = createNode('dd');
        dd.classList.add('item-' + index);
        const p = createNode('p');

        p.innerHTML = tab[i];
        dd.append(p);
        dl.appendChild(dd);
      }
    }
    
  });
  
  main.appendChild(dl);
  closeMenu();
}


//hide all the subcategories in the menu
function closeMenu() {
  const dd = document.querySelectorAll('dd');
  dd.forEach(el => {
    if (!el.classList.contains('hide')) {
      el.classList.add('hide');
    }
  });
}

//show the subcategories of the given index in the menu
function openMenu(dt, index) {
  let oldShow = document.querySelector('.show');
  if (oldShow !== null) {
    oldShow.classList.remove('show');
  }

  dt.classList.add('show');
  const items = document.querySelectorAll('dd.item-' + index);
  items.forEach(el => {
    if (el.classList.contains('hide')) {
      el.classList.remove('hide');
    }
  });
}

//create dt label
function createDt(tab, index) {
  const dt = createNode('dt');

  dt.classList.add('item-' + index);
  dt.innerHTML = tab[0];

  dt.addEventListener('click', () => { 
    closeMenu();
    //if it's opened we close that element and if it's closed we open it
    if( !dt.classList.contains('show')) {
      openMenu(dt, index);
    } else {
      dt.classList.remove('show')
    }
  })

  return dt;
}


loadData();
'use strict';
// Меню
(function () {
  const pageHeader = document.querySelector('.page-header');
  const toggleButton = document.getElementById('toggle-button');

  let navWrapper, mainMenu;
  let coordY = window.pageYOffset;

  const SCROLL_Y_VALUE = 70;

  if (pageHeader) {
    pageHeader.classList.add('page-header--js');

    mainMenu = pageHeader.querySelector('.main-menu');
    navWrapper = pageHeader.querySelector('.page-header__nav-wrapper');

    if (mainMenu) {
      mainMenu.classList.add('main-menu--closed');
    }

    if (navWrapper) {
      navWrapper.setAttribute('data-status', 'closed');
      navWrapper.classList.add('page-header__nav-wrapper--js');
      navWrapper.classList.add('page-header__nav-wrapper--transparent');

      window.addEventListener('scroll', scrollWindow);
    }
  }

  if (toggleButton) {
    toggleButton.classList.add('main-nav__toggle--js');
    toggleButton.classList.add('main-nav__toggle--off');
    toggleButton.addEventListener('click', clickToggleButton);
  }

  function clickToggleButton(evt) {
    let element = evt.target;

    evt.preventDefault();
    element.classList.toggle('main-nav__toggle--off');

    if (mainMenu) {
      mainMenu.classList.toggle('main-menu--closed');
    }

    if (navWrapper) {
      if (navWrapper.dataset.status === 'closed') {
        navWrapper.dataset.status = 'opened';
      } else {
        navWrapper.dataset.status = 'closed';
      }

      if (navWrapper.classList.contains('page-header__nav-wrapper--transparent')) {
        navWrapper.classList.remove('page-header__nav-wrapper--transparent');
      } else {
        if (coordY < SCROLL_Y_VALUE) {
          navWrapper.classList.add('page-header__nav-wrapper--transparent');
        }
      }
    }
  }

  function scrollWindow() {
    coordY = window.pageYOffset;

    if (navWrapper.dataset.status === 'closed') {
      if (coordY > SCROLL_Y_VALUE) {
        navWrapper.classList.remove('page-header__nav-wrapper--transparent');
      } else {
        navWrapper.classList.add('page-header__nav-wrapper--transparent');
      }
    }
  }
})();

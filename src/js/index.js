'use strict';

(function () {
  var HEADER_SEL = '.page-header';
  var NO_JS_CLS = 'page-header--no-js';
  var MENU_CLOSED_CLS = 'page-header--menu-closed';
  var BTN_TOGGLE_CLS = 'page-header__toggle';
  var BTN_TOGGLE_OFF_CLS = 'page-header__toggle--off';

  var pageHeader = document.querySelector(HEADER_SEL);

  if (pageHeader) {
    if (pageHeader.classList.contains(NO_JS_CLS)) {
      pageHeader.classList.remove(NO_JS_CLS);
      pageHeader.classList.add(MENU_CLOSED_CLS);
    }
  }

  pageHeader.addEventListener('click', function (event) {
    if (event.target.classList.contains(BTN_TOGGLE_CLS)) {
      event.preventDefault();

      this.classList.toggle(MENU_CLOSED_CLS);
      event.target.classList.toggle(BTN_TOGGLE_OFF_CLS);
    }
  })
})();

// Яндекс карта
function init (ymaps) {
  var map = new ymaps.Map('map', {
    center: [59.936800, 30.322861],
    zoom: 15,
    controls: ['zoomControl']
  });

  var placemark = new ymaps.Placemark([59.936160, 30.322861], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icon-map-marker.svg',
    iconImageSize: [35, 35]
  });

  map.behaviors.disable('scrollZoom');
  map.geoObjects.add(placemark);
}

svg4everybody();

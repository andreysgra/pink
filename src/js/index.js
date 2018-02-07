'use strict';

(function () {
  var HEADER_SEL = '.page-header';
  var NAV_SEL = '.main-nav';
  var NO_JS_CLS = 'main-nav--no-js';
  var HEADER_CLOSED_CLS = 'page-header--nav-closed';
  var NAV_CLOSED_CLS = 'main-nav--closed';
  var BTN_TOGGLE_CLS = 'main-nav__toggle';
  var BTN_TOGGLE_OFF_CLS = 'main-nav__toggle--off';

  var pageHeader = document.querySelector(HEADER_SEL);
  var mainNav = document.querySelector(NAV_SEL);

  if (mainNav && mainNav.classList.contains(NO_JS_CLS)) {
    mainNav.classList.remove(NO_JS_CLS);
    mainNav.classList.add(NAV_CLOSED_CLS);

    if (pageHeader) {
      pageHeader.classList.add(HEADER_CLOSED_CLS);
    }
  }

  mainNav.addEventListener('click', function (event) {
    if (event.target.classList.contains(BTN_TOGGLE_CLS)) {
      event.preventDefault();

      this.classList.toggle(NAV_CLOSED_CLS);
      event.target.classList.toggle(BTN_TOGGLE_OFF_CLS);
      pageHeader.classList.toggle(HEADER_CLOSED_CLS);
    }
  });

})();

// Яндекс карта
function init (ymaps) {
  var map = new ymaps.Map('map', {
    center: [59.93863106417265, 30.3230545],
    zoom: 16,
    controls: []
  });

  var placemark = new ymaps.Placemark([59.93863106417265, 30.3230545], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icon-map-marker.svg',
    iconImageSize: [35, 35],
    iconImageOffset: [-18, -18]
  });

  var zoomControl = new ymaps.control.ZoomControl({
    options: {
      position: {
        left: 10,
        bottom: 50
      }
    }
  });

  map.behaviors.disable('scrollZoom');
  map.geoObjects.add(placemark);
  map.controls.add(zoomControl);
}

svg4everybody();

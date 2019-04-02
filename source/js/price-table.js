'use strict';
// Таблица тарифов
(function () {
  const priceBlock = document.getElementById('price');
  let sliderButtons, priceTable;

  if (priceBlock) {
    const sliderControls = priceBlock.querySelector('.slider-controls');
    priceTable = priceBlock.querySelector('.price__table');

    sliderButtons = Array.from(sliderControls.querySelectorAll('.slider-controls__button'));

    if (sliderButtons) {
      sliderControls.addEventListener('click', clickSliderControls);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('slider-controls__button--current');
  }

  function clickSliderControls(evt) {
    let element = evt.target;

    if (element.classList.contains('slider-controls__button')) {
      let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));
      let indexNextButton = sliderButtons.indexOf(element);

      sliderButtons[indexCurrentButton].classList.remove('slider-controls__button--current');
      sliderButtons[indexNextButton].classList.add('slider-controls__button--current');
      priceTable.style.left = `${(150 - indexNextButton * 100)}%`;
    }
  }
})();

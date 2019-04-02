'use strict';
// Блок отзывов
(function () {
  const reviewsSlider = document.getElementById('slider-reviews');
  let sliderButtons, sliderNavButtons, slides;

  if (reviewsSlider) {
    const sliderControls = reviewsSlider.querySelector('.slider-controls');
    const sliderNav = reviewsSlider.querySelector('.slider-nav');

    sliderButtons = Array.from(sliderControls.querySelectorAll('.slider-controls__button'));
    sliderNavButtons = Array.from(sliderNav.querySelectorAll('.slider-nav__slider-button'));
    slides = Array.from(reviewsSlider.querySelectorAll('.slider-reviews__slide'));

    if (slides && sliderButtons) {
      sliderControls.addEventListener('click', clickSliderControls);
      sliderNav.addEventListener('click', clickSliderNav);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('slider-controls__button--current');
  }

  function findCurrentSlide(element) {
    return element.classList.contains('slider-reviews__slide--current');
  }

  function changeSlides(indexCurrentSlide, indexNextSlide) {
    slides[indexCurrentSlide].classList.remove('slider-reviews__slide--current');
    slides[indexNextSlide].classList.add('slider-reviews__slide--current');
  }

  function clickSliderControls(evt) {
    let element = evt.target;

    if (element.classList.contains('slider-controls__button')) {
      evt.preventDefault();

      let indexCurrentButton = sliderButtons.indexOf(sliderButtons.find(findCurrentButton));
      let indexNextButton = sliderButtons.indexOf(element);

      sliderButtons[indexCurrentButton].classList.remove('slider-controls__button--current');
      sliderButtons[indexNextButton].classList.add('slider-controls__button--current');

      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexNextButton;

      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }

  function clickSliderNav(evt) {
    let element = evt.target;

    if (element.classList.contains('slider-nav__slider-button')) {
      evt.preventDefault();

      let indexButton = sliderNavButtons.indexOf(element);
      let indexCurrentSlide = slides.indexOf(slides.find(findCurrentSlide));
      let indexNextSlide = indexCurrentSlide;

      switch (indexButton) {
        case 0:
          indexNextSlide -= 1;
          if (indexNextSlide < 0) {
            indexNextSlide = slides.length - 1;
          }
          break;

        case 1:
          indexNextSlide += 1;
          if (indexNextSlide >= slides.length) {
            indexNextSlide = 0;
          }
          break;

        default:
          break;
      }

      changeSlides(indexCurrentSlide, indexNextSlide);
    }
  }
})();

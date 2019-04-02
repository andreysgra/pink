'use strict';
// Блок фильтров для фото
(function () {
  const photoFilters = document.getElementById('photo-filters');
  let filterButtons, filters;

  if (photoFilters) {
    const filtersButtons = photoFilters.querySelector('.form-photo__filters-buttons');

    filterButtons = Array.from(filtersButtons.querySelectorAll('.form-photo__filter-button'));
    filters = Array.from(photoFilters.querySelectorAll('.form-photo__filter'));

    if (filterButtons && filters) {
      filtersButtons.addEventListener('click', clickFiltersButtons);
    }
  }

  function findCurrentButton(element) {
    return element.classList.contains('form-photo__filter-button--current');
  }

  function findCurrentFilter(element) {
    return element.classList.contains('form-photo__filter--current');
  }

  function changeFilters(indexCurrentSlide, indexNextSlide) {
    filters[indexCurrentSlide].classList.remove('form-photo__filter--current');
    filters[indexNextSlide].classList.add('form-photo__filter--current');
  }

  function clickFiltersButtons(evt) {
    let element = evt.target;

    if (element.classList.contains('form-photo__filter-button')) {
      evt.preventDefault();

      let indexCurrentButton = filterButtons.indexOf(filterButtons.find(findCurrentButton));
      let indexNextButton = filterButtons.indexOf(element);

      filterButtons[indexCurrentButton].classList.remove('form-photo__filter-button--current');
      filterButtons[indexNextButton].classList.add('form-photo__filter-button--current');

      let indexCurrentFilter = filters.indexOf(filters.find(findCurrentFilter));
      let indexNextFilter = indexNextButton;

      changeFilters(indexCurrentFilter, indexNextFilter);
    }
  }
})();

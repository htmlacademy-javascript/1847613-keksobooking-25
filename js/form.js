import { PRICE_OF_TYPES } from './data.js';
import { getSlider } from './api-nouislider.js';


const form = document.querySelector('.ad-form');
const fieldSet = form.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const filters = mapFilter.querySelectorAll('.map__filter');
const filterCheckbox = mapFilter.querySelector('.map__features');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
}, false);
const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');
// Время заезда и выезда
const addFormElementTime = document.querySelector('.ad-form__element--time');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
addFormElementTime.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});
// Изменение цены в зависимости от типа жилья
const type = document.querySelector('#type');
const price = document.querySelector('#price');
type.addEventListener('change', (evt) => {
  price.min = PRICE_OF_TYPES[evt.target.value];
  price.placeholder = PRICE_OF_TYPES[evt.target.value];
  price.value = '';
});

const validateCapacity = () => guestsField.value <= roomsField.value
  && parseInt(roomsField.value, 10) !== 100
  && parseInt(guestsField.value, 10)  !== 0;

pristine.addValidator(
  roomsField,
  validateCapacity,
  'Выберите другое значение'
);

pristine.addValidator(
  guestsField,
  validateCapacity,
  'Выберите другое значение'
);

const validateForm = () => {
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

const switchToUnready = () => {
  form.classList.add('ad-form--disabled');
  fieldSet.forEach((elem) => {
    elem.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('map__filters--disabled');
  filters.forEach((elem) => {
    elem.setAttribute('disabled', 'disabled');
  });
  filterCheckbox.setAttribute('disabled', 'disabled');
};

const switchToReady = () => {
  getSlider();
  form.classList.remove('ad-form--disabled');
  fieldSet.forEach((elem) => {
    elem.removeAttribute('disabled', 'disabled');
  });
  mapFilter.classList.remove('map__filters--disabled');
  filters.forEach((elem) => {
    elem.removeAttribute('disabled', 'disabled');
  });
  filterCheckbox.removeAttribute('disabled', 'disabled');
};

export {validateForm, switchToUnready, switchToReady};

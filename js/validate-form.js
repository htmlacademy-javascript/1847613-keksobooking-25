import { PRICE_OF_TYPES } from './data.js';

const form = document.querySelector('.ad-form');
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

export {validateForm};

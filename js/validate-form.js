import { CAPACITY_OPTION, PRICE_OF_TYPES } from './data.js';

const validateForm = () => {
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
  // Изменение типа жилья в зависимости от цены
  const type = document.querySelector('#type');
  const price = document.querySelector('#price');
  price.addEventListener('change', (evt) => {
    for (const typePrice in PRICE_OF_TYPES) {
      if (evt.target.value >= PRICE_OF_TYPES[typePrice]) {
        type.value = typePrice;
      }
    }
  });
  // Изменение цены в зависимости от типа жилья
  type.addEventListener('change', (evt) => {
    price.value = PRICE_OF_TYPES[evt.target.value];
    price.placeholder = PRICE_OF_TYPES[evt.target.value];
  });

  const validateCapacity = () => CAPACITY_OPTION[roomsField.value].includes(guestsField.value);

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

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export {validateForm};

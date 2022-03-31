import { PRICE_OF_TYPES } from './data.js';
import { sendData } from './api.js';
import { getStartingValue, setDefaultMap } from './api-map.js';
import { showErrorMessage } from './user-messages.js';

const form = document.querySelector('.ad-form');
const fieldSet = form.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const filters = mapFilter.querySelectorAll('.map__filter');
const filterCheckbox = mapFilter.querySelector('.map__features');
const buttonSubmit = document.querySelector('.ad-form__submit');
const buttonReset = document.querySelector('.ad-form__reset');
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
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
addFormElementTime.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
  timeIn.value = evt.target.value;
});

const getSlider = () => {
  const startingValues = {
    min: 0,
    max: 100000,
  };

  noUiSlider.create(sliderElement, {
    range: startingValues,
    start: 1000,
    step: 10,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => value
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    price.value = sliderElement.noUiSlider.get();
  });
};

// Изменение цены в зависимости от типа жилья
type.addEventListener('change', (evt) => {
  const priceMin = PRICE_OF_TYPES[evt.target.value];
  price.setAttribute('min', priceMin);
  price.setAttribute('placeholder', priceMin);
  price.setAttribute('value', price.value);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: priceMin,
      max: 100000
    },
    start: price.value
  });
});

price.addEventListener('input', (evt) => {
  price.value = evt.target.value;
});

const validatePrice = () => parseInt(price.value, 10) >= parseInt(price.min, 10)
  && parseInt(price.value, 10) >= 0
  && parseInt(price.value, 10) <= 100000;

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

pristine.addValidator(
  price,
  validatePrice,
  'Выберите другое значение'
);

const resetForm = () => {
  form.reset();
  mapFilter.reset();
  getStartingValue();
  setDefaultMap();

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1000,
      max: 100000
    },
    start: 1000
  });
};

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
};

const validateForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
      resetForm();
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

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
});

export {validateForm, switchToUnready, switchToReady};

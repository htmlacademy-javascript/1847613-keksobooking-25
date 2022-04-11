import { priceOfTypes } from './data.js';
import { sendData } from './api.js';
import { getStartingValue, setDefaultMap } from './api-map.js';
import { showErrorMessage } from './user-messages.js';
import { FILE_TYPES } from './data.js';

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
const addFormElementTime = document.querySelector('.ad-form__element--time');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const sliderElement = document.querySelector('.ad-form__slider');
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

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

type.addEventListener('change', (evt) => {
  const priceMin = priceOfTypes[evt.target.value];
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

const validatePrice = () => Number(price.value) >= 0
  && Number(price.value) <= 100000;

const validateCapacity = () => guestsField.value <= roomsField.value
  && Number(roomsField.value) !== 100
  && Number(guestsField.value)  !== 0;

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
  pristine.reset();
  mapFilter.reset();
  getStartingValue();
  setDefaultMap();
  previewPhoto.innerHTML = '';
  previewAvatar.src = 'img/muffin-grey.svg';

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

const showPhoto = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });

  photoChooser.addEventListener('change', () => {
    const photos = Array.from(photoChooser.files);
    photos.forEach((file) => {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

      if (matches) {
        previewPhoto.style.display = 'flex';
        const photo = document.createElement('img');
        photo.style.height = '70px';
        photo.style.width = '70px';
        previewPhoto.append(photo);
        photo.src = URL.createObjectURL(file);
      }
    });
  });
};

const validateForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }
    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
        resetForm();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
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
  showPhoto();
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

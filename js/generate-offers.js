import { createOffers } from './create-offers.js';

const typesOfInhabitation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const card = document.querySelector('#card').content.querySelector('.popup');
const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
const offers = createOffers();
const offersFragment = document.createDocumentFragment();

const insertFeatures = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${item}`);
    element.appendChild(featureItem);
  });
};

const insertPhotos = (element, array) => {
  element.innerHTML = '';

  array.forEach((item) => {
    const addPhoto = imgTemplate.cloneNode(true);
    addPhoto.src = item;
    element.append(addPhoto);
  });
};

offers.forEach((
  {author: {avatar},
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
  }) => {
  const cardElement = card.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesOfInhabitation[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  insertFeatures(cardElement.querySelector('.popup__features'), features);
  if (!description) {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  } else {
    cardElement.querySelector('.popup__description').textContent = description;
  }
  insertPhotos(cardElement.querySelector('.popup__photos'), photos);
  cardElement.querySelector('.popup__avatar').src = avatar;
  offersFragment.append(cardElement);
});

export {offersFragment};

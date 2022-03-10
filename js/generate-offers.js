import { createOffers } from './create-offers.js';
import { createImage, createListItem } from './util.js';
import { TYPES_OF_INHABITATION } from './data.js';

const offers = createOffers()[0];
const offersFragment = document.createDocumentFragment();

const getElement = (arr, f) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((element) => {
    fragment.append(f(element));
  });
  return fragment;
};

const renderCard = () => {
  const {author: {avatar},
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}} = offers;
  const card = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = card.cloneNode(true);
  const cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  const cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';

  cardElement.querySelector('.popup__title').textContent = title || '';
  cardElement.querySelector('.popup__text--address').textContent = address || '';
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь` || '';
  cardElement.querySelector('.popup__type').textContent = TYPES_OF_INHABITATION[type] || '';
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей` || '';
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}` || '';
  cardElement.querySelector('.popup__description').textContent = description || '';
  cardPhotos.append(getElement(photos, createImage));
  cardFeatures.append(getElement(features, createListItem));
  cardElement.querySelector('.popup__avatar').src = avatar;

  offersFragment.append(cardElement);
  return offersFragment;
};

export {renderCard};

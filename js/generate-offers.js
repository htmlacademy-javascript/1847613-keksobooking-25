import { createOffers } from './create-offers.js';
import { createImage, createListItem, getElement } from './util.js';
import { typesOfInhabitation } from './data.js';

const renderCard = () => {
  const {author: {avatar},
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}} = createOffers()[0];
  const card = document.querySelector('#card').content.querySelector('.popup');
  const offersFragment = document.createDocumentFragment();
  const cardElement = card.cloneNode(true);
  const cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  const cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';

  cardElement.querySelector('.popup__title').textContent = title || '';
  cardElement.querySelector('.popup__text--address').textContent = address || '';
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь` || '';
  cardElement.querySelector('.popup__type').textContent = typesOfInhabitation[type] || '';
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

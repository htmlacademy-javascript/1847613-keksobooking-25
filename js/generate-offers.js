import { createImage, createListItem, getElement } from './util.js';
import { typesOfInhabitation } from './data.js';

const renderCard = (cardData) => {

  const card = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = card.cloneNode(true);
  const cardPhotos = cardElement.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  const cardFeatures = cardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';

  cardElement.querySelector('.popup__title').textContent = cardData.offer.title || '';
  cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address || '';
  cardElement.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь` || '';
  cardElement.querySelector('.popup__type').textContent = typesOfInhabitation[cardData.offer.type] || '';
  cardElement.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей` || '';
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}` || '';
  cardElement.querySelector('.popup__description').textContent = cardData.offer.description || '';
  cardPhotos.append(getElement(cardData.offer.photos, createImage));
  cardFeatures.append(getElement(cardData.offer.features, createListItem));
  cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;

  return cardElement;
};

export {renderCard};

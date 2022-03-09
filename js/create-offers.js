import { getRandomNumber, getRandomFloatNumber, getRandomArrayElement, randomAvatar, getRandomArray } from './util.js';
import { CHECKIN_TIMES, CHECKOUT_TIMES, PHOTOS, TYPES, FEATURES, TITLES, DESCRIPTIONS } from './data.js';

const createOffer = () => {
  const lat = getRandomFloatNumber(35.65000, 35.70000, 5);
  const lng = getRandomFloatNumber(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: randomAvatar(),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomNumber(3000, 15000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const createOffers = () => Array.from({length: 1}, createOffer);

export {createOffers};

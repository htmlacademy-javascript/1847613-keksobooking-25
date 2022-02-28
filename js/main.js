const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Title 1','Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8'];
const DESCRIPTIONS = ['Descr 1','Descr 2', 'Descr 3', 'Descr 4', 'Descr 5'];
const randomAvatar = getRandomAvatarImage();

function getRandomNumber(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomFloatNumber(a, b, decimals = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(decimals);
}

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

function getRandomAvatarImage() {
  let i = 1;
  return function() {
    let str = '';
    if (i < 10) {
      str = `img/avatars/user0${i}.png`;
    } else {
      str = `img/avatars/user${i}.png`;
    }
    i++;
    return str;
  };
}

function getRandomArray(elements) {
  const lengthOfArray = getRandomNumber(1, elements.length);
  const array = [];

  while (array.length < lengthOfArray) {
    const element = getRandomArrayElement(elements);

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
}

function createOffer() {
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
}

createOffer();

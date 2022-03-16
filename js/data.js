const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Title 1','Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8'];
const DESCRIPTIONS = ['Descr 1','Descr 2', 'Descr 3', 'Descr 4', 'Descr 5'];
const TYPES_OF_INHABITATION = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};
const CAPACITY_OPTION = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const PRICE_OF_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

export {CHECKIN_TIMES, CHECKOUT_TIMES, PHOTOS, TYPES, FEATURES, TITLES,
  DESCRIPTIONS, TYPES_OF_INHABITATION, CAPACITY_OPTION, PRICE_OF_TYPES};

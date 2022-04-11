const FILTERED_POINTS_LENGTH = 10;
const DEBOUNCE_TIME = 500;
const DELAY_TIME = 5000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const typesOfInhabitation = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const priceOfTypes = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const PriceValues = {
  AVERAGE_START: 10000,
  AVERAGE_FINAL: 50000,
};

const startingCoordinates = {
  lat: '35.68950',
  lng: '139.69171',
};

const ServerAddress = {
  GET: 'https://25.javascript.pages.academy/keksobooking/data',
  POST: 'https://25.javascript.pages.academy/keksobooking'
};

export {typesOfInhabitation, priceOfTypes, PriceValues, FILTERED_POINTS_LENGTH,
  startingCoordinates, ServerAddress, DEBOUNCE_TIME, FILE_TYPES, DELAY_TIME};

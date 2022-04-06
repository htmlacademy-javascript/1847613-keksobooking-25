import { PriceValues, FILTERED_POINTS_LENGTH } from './data.js';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelectorAll('.map__checkbox');

const filterByType = (point) => housingType.value === 'any' || housingType.value === point.offer.type;
const filterByRooms = (point) => housingRooms.value === 'any' || Number(housingRooms.value) === point.offer.rooms;
const filterByGuests = (point) => housingGuests.value === 'any' || Number(housingGuests.value) === point.offer.rooms;
const filterByPrice = (point) => {
  const priceInterval = {
    'low': point.offer.price < PriceValues.AVERAGE_START,
    'middle': point.offer.price >= PriceValues.AVERAGE_START && point.offer.price <= PriceValues.AVERAGE_FINAL,
    'high': point.offer.price > PriceValues.AVERAGE_FINAL,
  };
  return housingPrice.value === 'any' || priceInterval[housingPrice.value];
};

const getCheckboxFeatures = () => Array.from(housingFeatures)
  .filter((elem) => elem.checked).map((item) => item.value);

const filterByFeatures = (point, filterFeatures) => point.offer.features &&
  filterFeatures.every((feature) => point.offer.features.some((featureValue) => feature === featureValue));

const filtered = (points) => {
  const filteredPoints = [];

  for (let i = 0; i < points.length && filteredPoints.length < FILTERED_POINTS_LENGTH; i++) {
    const point = points[i];
    if (filterByType(point) && filterByRooms(point) && filterByGuests(point)
      && filterByPrice(point) && filterByFeatures(point, getCheckboxFeatures())) {
      filteredPoints.push(point);
    }
  }
  return filteredPoints;
};

export {filtered};

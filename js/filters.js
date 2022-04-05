const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

const filterByType = (point) => housingType.value === 'any' || housingType.value === point.offer.type;

const filterByRooms = (point) => housingRooms.value === 'any' || Number(housingRooms.value) === point.offer.rooms;

const filterByGuests = (point) => housingGuests.value === 'any' || Number(housingGuests.value) === point.offer.rooms;

const filterByPrice = (point) => {
  const priceInterval = {
    'low': point.offer.price < 10000,
    'middle': point.offer.price >= 10000 && point.offer.price <= 50000,
    'high': point.offer.price > 50000,
  };
  return housingPrice.value === 'any' || priceInterval[housingPrice.value];
};

const getCheckboxFeatures = () => {
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  const features = [];

  housingFeatures.forEach((element) => {
    if (element.checked) {
      features.push(element.value);
    }
  });
  return features;
};

const filterByFeatures = (point, filterFeatures) => point.offer.features &&
  filterFeatures.every((feature) => point.offer.features.some((featureValue) => feature === featureValue));

const filtered = (points) => {
  const filteredPoints = [];

  for (let i = 0; i < points.length && filteredPoints.length < 10; i++) {
    const point = points[i];
    if (filterByType(point) && filterByRooms(point) && filterByGuests(point)
      && filterByPrice(point) && filterByFeatures(point, getCheckboxFeatures())) {
      filteredPoints.push(point);
    }
  }
  return filteredPoints;
};

export {filtered};

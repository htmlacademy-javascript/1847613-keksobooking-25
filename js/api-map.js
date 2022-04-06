import { renderCard } from './generate-offers.js';
import { switchToReady, switchToUnready } from './form.js';
import { getData } from './api.js';
import { filtered } from './filters.js';
import { debounce } from './util.js';
import { startingCoordinates, DEBOUNCE_TIME } from './data.js';

const formFilter = document.querySelector('.map__filters');
const address = document.querySelector('#address');

const savedPoints = [];

const setCoordinatesValue = ({lat, lng}) => `${lat}, ${lng}`;
const getStartingValue = () => {
  address.value = setCoordinatesValue(startingCoordinates);
};

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  startingCoordinates,
  {
    draggable: true,
    icon: mainPinIcon
  },
);

const markersGroup = L.layerGroup();
const map = L.map('map-canvas');

const createMarker = (points) => {
  map.closePopup();
  markersGroup.clearLayers();
  filtered(points).forEach((point) => {
    const marker = L.marker(
      point.location,
      {
        icon,
      },
    );

    marker
      .addTo(markersGroup)
      .bindPopup(renderCard(point));
  });
};

const getMap = () => {
  switchToUnready();
  map.on('load', () => {
    getData((points) => {
      createMarker(points);
      savedPoints.push(...points);
    });
    getStartingValue();
  })
    .setView(startingCoordinates, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    coordinates.lat = coordinates.lat.toFixed(5);
    coordinates.lng = coordinates.lng.toFixed(5);

    address.value = setCoordinatesValue(coordinates);
  });

  mainPinMarker.addTo(map);
  markersGroup.addTo(map);
  switchToReady();
};

const setDefaultMap = () => {
  mainPinMarker.setLatLng(startingCoordinates);
  map.closePopup();
};

formFilter.addEventListener('change', debounce(() => createMarker(savedPoints), DEBOUNCE_TIME));

export {getMap, getStartingValue, setDefaultMap};

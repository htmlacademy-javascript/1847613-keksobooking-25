import { renderCard } from './generate-offers.js';
import { switchToReady } from './form.js';
import { getData } from './api.js';

const address = document.querySelector('#address');
const startingCoordinates = {
  lat: '35.68950',
  lng: '139.69171',
};

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

const createMarker = (points) => {
  points.forEach((point) => {
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

getData(createMarker);

const getMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      switchToReady();
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
};

const setDefaultMap = () => {
  mainPinMarker.setLatLng(startingCoordinates);
};

export {getMap, getStartingValue, setDefaultMap};

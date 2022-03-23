import { createOffers } from './create-offers.js';
import { renderCard } from './generate-offers.js';
import { switchToReady } from './form.js';

const data = createOffers();

const getMap = () => {
  const address = document.querySelector('#address');
  const STARTING_COORDINATES = {
    lat: '35.68950',
    lng: '139.69171',
  };

  const setCoordinatesValue = ({lat, lng}) => `${lat}, ${lng}`;
  const startingValue = () => {
    address.value = setCoordinatesValue(STARTING_COORDINATES);
  };

  const map = L.map('map-canvas')
    .setView(STARTING_COORDINATES, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  startingValue();

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    STARTING_COORDINATES,
    {
      draggable: true,
      icon: mainPinIcon
    },
  );
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    coordinates.lat = coordinates.lat.toFixed(5);
    coordinates.lng = coordinates.lng.toFixed(5);

    address.value = setCoordinatesValue(coordinates);
  });

  const markerGroup = L.layerGroup().addTo(map);

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const createMarker = (point) => {
    const marker = L.marker(
      point.location,
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(point));
  };

  data.forEach((point) => {
    createMarker(point);
  });

  switchToReady();
};

export {getMap};

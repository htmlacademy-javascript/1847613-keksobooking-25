import { renderCard } from './generate-offers.js';

const canvas = document.querySelector('#map-canvas');

canvas.append(renderCard());

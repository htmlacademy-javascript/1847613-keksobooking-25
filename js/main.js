import { renderCard } from './generate-offers.js';
import { validateForm } from './validateForm.js';

const canvas = document.querySelector('#map-canvas');
validateForm();

canvas.append(renderCard());

import { renderCard } from './generate-offers.js';
import { validateForm } from './validate-form.js';

const canvas = document.querySelector('#map-canvas');
validateForm();

canvas.append(renderCard());

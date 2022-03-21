import { renderCard } from './generate-offers.js';
import { validateForm, isNotReady, isReady } from './validate-form.js';

const canvas = document.querySelector('#map-canvas');
validateForm();
isNotReady();
isReady();
canvas.append(renderCard());

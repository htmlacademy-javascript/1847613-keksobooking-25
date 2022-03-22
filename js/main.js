import { renderCard } from './generate-offers.js';
import { validateForm, switchToUnready, switchToReady } from './form.js';

const canvas = document.querySelector('#map-canvas');
validateForm();
switchToUnready();
switchToReady();
canvas.append(renderCard());

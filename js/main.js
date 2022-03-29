import { validateForm, switchToUnready } from './form.js';
import { getMap } from './api-map.js';

switchToUnready();
validateForm();
getMap();

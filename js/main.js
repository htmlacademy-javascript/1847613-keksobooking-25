import { validateForm, switchToUnready } from './form.js';
import { getMap } from './api-map.js';
import {showSuccessMessage} from './user-messages.js';

switchToUnready();
validateForm(showSuccessMessage);
getMap();

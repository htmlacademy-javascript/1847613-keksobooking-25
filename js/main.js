import { validateForm } from './form.js';
import { getMap } from './api-map.js';
import {showSuccessMessage} from './user-messages.js';

validateForm(showSuccessMessage);
getMap();

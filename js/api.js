import { showAlert } from './util.js';
import { ServerAddress } from './data.js';

const getData = (onSuccess) => {
  fetch(ServerAddress.GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert('Ошибка сервера'));
    })
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => showAlert('Ошибка сервера'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(ServerAddress.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => showAlert('Ошибка отправки формы'));
};

export {getData, sendData};

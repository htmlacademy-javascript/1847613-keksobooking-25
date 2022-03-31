import { showAlert } from './util.js';

const ServerGetAddress = 'https://25.javascript.pages.academy/keksobooking/data';
const ServerSendAddress = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(ServerGetAddress)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert('Ошибка сервера'));
    })
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers.slice(0,10));
    })
    .catch(() => showAlert('Ошибка сервера'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(ServerSendAddress,
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
    .catch(() => showAlert('Ошибка отправки'));
};

export {getData, sendData};

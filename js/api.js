import { showAlert } from './util.js';

const ServerAddress = {
  GET: 'https://25.javascript.pages.academy/keksobooking/data',
  POST: 'https://25.javascript.pages.academy/keksobooking'
};

const getData = (onSuccess) => {
  fetch(ServerAddress.GET)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(showAlert('Ошибка сервера'));
    })
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
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
    .catch(() => showAlert('Ошибка отправки'));
};

export {getData, sendData};

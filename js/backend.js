"use strict";

const TIMEOUT_IN_MS = 10000;
const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};
const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const showError = (message) => {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageElement.querySelector(`.error__message`).textContent = message;
  window.reset.mainNode.appendChild(errorMessageElement);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress);
  errorMessageElement.addEventListener(`click`, window.reset.removeMessageElementHandler);
};

const workWithServer = (method, dataUrl, onSuccess, data) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      showError(`При обращению к серверу произошла ошибка. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
    }
  });
  xhr.addEventListener(`error`, () => {
    showError(`Произошла ошибка соединения. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.addEventListener(`timeout`, () => {
    showError(`Запрос не успел выполниться за ${xhr.timeout}мс. Статус ответа: ${xhr.status} ${xhr.statusText}. Попробуйте перезагрузить страницу`);
  });
  xhr.open(method, dataUrl);
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(method === `GET` ? `` : data);
};

const load = (onSuccess) => {
  workWithServer(`GET`, Url.LOAD, onSuccess);
};

const upload = (data, onSuccess) => {
  workWithServer(`POST`, Url.UPLOAD, onSuccess, data);
};

window.backend = {
  load,
  upload,
  showError,
  StatusCode
};

"use strict";
(() => {
  const StatusCode = {
    ОК: 200
  };
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;

  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showError = (message) => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector(`.error__message`).textContent = message;
    window.reset.mainNode.appendChild(errorMessageElement);

    document.addEventListener(`keydown`, window.util.onPopupMessageEscPress);
    errorMessageElement.addEventListener(`click`, window.reset.removeMessageElement);
  };

  window.upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.ОК) {
        onSuccess(xhr.response);
      } else {
        showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`timeout`, () => {
      showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
    });
    xhr.addEventListener(`error`, () => {
      showError(`Ошибка загрузки объявления. Код ошибки: ${xhr.status} ${xhr.statusText}`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();

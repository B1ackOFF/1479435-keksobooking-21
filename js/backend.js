"use strict";
(()=> {
  const Url = {
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    UPLOAD: `https://21.javascript.pages.academy/keksobooking`
  };
  const StatusCode = {
    ОК: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

  const showError = (message) => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector(`.error__message`).textContent = message;
    window.reset.mainNode.appendChild(errorMessageElement);

    document.addEventListener(`keydown`, window.util.onPopupMessageEscPress);
    errorMessageElement.addEventListener(`click`, window.reset.removeMessageElement);
  };

  const workWithServer = (method, dataUrl, onSuccess, data) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.ОК) {
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

  window.backend = {
    load: (onSuccess) => {
      workWithServer(`GET`, Url.LOAD, onSuccess);
    },
    upload: (data, onSuccess) => {
      workWithServer(`POST`, Url.UPLOAD, onSuccess, data);
    },
    showError
  };
  /*
  const TITLES = [
    `Дворец однокомнатный`,
    `Квартира на минус первом этаже`,
    `Шалаш у моря`,
    `Утепленный гараж`,
    `Просторная коробка`
  ];
  const DESCRIPTIONS = [
    `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`,
    `Шикарное маленькое жилище на окраине города. Рядом большой парк, 30 минут до центра на вертолете! Удобства на улице. Звонить не ранее 11-00 и не позднее 20-00`,
    `Уютный вариант, который подойдет молодоженам и семейным парам, только славяне. Предоплата 100% за первый и последний месяц. Риэлторам не беспокоить!`
  ];
  const HOUSE_TYPES = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    palace: `Замок`,
    house: `Дом`
  };
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const CHECKINS = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const CHECKOUTS = [
    `12:00`,
    `13:00`,
    `14:00`
  ];
  const ROOMS_AMOUNT = [
    1,
    2,
    3,
    100
  ];
  const GUESTS_AMOUNT = [
    3,
    2,
    1,
    0
  ];
  const PHOTOS_URLS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const PINS_AMOUNT = 8;
  const MAX_PRICE = 10000;
  const MIN_PRICE = 1000;
  const PIN_WIDTH = 50;
  const MAX_COORDINATE_X = window.pin.mapPinsNode.offsetWidth - PIN_WIDTH;
  const MIN_COORDINATE_X = 0 + PIN_WIDTH;
  const MAX_COORDINATE_Y = 630;
  const MIN_COORDINATE_Y = 130;

  const createDataArray = (amount) => {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push(
          {
            author: {
              avatar: `img/avatars/user0${i + 1}.png`
            },
            location: {
              x: window.util.getRandomInRange(MIN_COORDINATE_X, MAX_COORDINATE_X),
              y: window.util.getRandomInRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
            },
            offer: {
              title: window.util.getRandomData(TITLES),
              address: `${window.util.getRandomInRange(MIN_COORDINATE_X, MAX_COORDINATE_X)}, ${window.util.getRandomInRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y)}`,
              price: window.util.getRandomInRange(MIN_PRICE, MAX_PRICE),
              type: window.util.getRandomData(Object.keys(HOUSE_TYPES)),
              rooms: window.util.getRandomData(ROOMS_AMOUNT),
              guests: window.util.getRandomData(GUESTS_AMOUNT),
              checkin: window.util.getRandomData(CHECKINS),
              checkout: window.util.getRandomData(CHECKOUTS),
              features: window.util.shuffleArray(FEATURES).slice(0, window.util.getRandomNumber(FEATURES)),
              description: window.util.getRandomData(DESCRIPTIONS),
              photos: window.util.shuffleArray(PHOTOS_URLS).slice(0, window.util.getRandomNumber(PHOTOS_URLS))
            }
          }
      );
    }
    return array;
  };

  window.data = {
    pinsDataArray: createDataArray(PINS_AMOUNT),
    FEATURES: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    HOUSE_TYPES: {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      palace: `Замок`,
      house: `Дом`
    }
  };*/
})();

"use strict";

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
const ROOMS_FOR_GUESTS = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};
const PHOTOS_URLS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilterContainerNode = mapNode.querySelector(`.map__filters-container`);
const formFiltersNode = mapFilterContainerNode.querySelector(`.map__filters`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const formNode = document.querySelector(`.ad-form`);
const formSubmit = formNode.querySelector(`.ad-form__submit`);

const PINS_AMOUNT = 8;
const MAX_PRICE = 10000;
const MIN_PRICE = 1000;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PINS_DISPLACEMENT_X = PIN_WIDTH / 2;
const PINS_DISPLACEMENT_Y = PIN_HEIGHT / 2;
const MAX_COORDINATE_X = mapPinsNode.offsetWidth - PIN_WIDTH;
const MIN_COORDINATE_X = 0 + PIN_WIDTH;
const MAX_COORDINATE_Y = 630;
const MIN_COORDINATE_Y = 130;
const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const PSEUDO_ELEMENT_PIN_HEIGHT = 22;

/*
const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};
*/
const toggleDisabledOnFormNodes = () => {
  const pageIsActive = formNode.classList.contains(`ad-form--disabled`);

  Array.from(formNode.children).forEach((children) => {
    children.disabled = pageIsActive;
    children.classList.toggle(`disable-cursor`);
  });
  Array.from(formFiltersNode.children).forEach((children) => {
    children.disabled = pageIsActive;
    children.classList.toggle(`disable-cursor`);
  });
};

const onActiveMode = () => {
  mapNode.classList.remove(`map--faded`);
  formNode.classList.remove(`ad-form--disabled`);
  toggleDisabledOnFormNodes();
};

const getRandomData = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (array) => {
  return [Math.floor(Math.random() * array.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

const createDataArray = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push(
        {
          author: {
            avatar: `img/avatars/user0${i + 1}.png`
          },
          location: {
            x: getRandomInRange(MIN_COORDINATE_X, MAX_COORDINATE_X),
            y: getRandomInRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
          },
          offer: {
            title: getRandomData(TITLES),
            address: `${getRandomInRange(MIN_COORDINATE_X, MAX_COORDINATE_X)}, ${getRandomInRange(MIN_COORDINATE_Y, MAX_COORDINATE_Y)}`,
            price: getRandomInRange(MIN_PRICE, MAX_PRICE),
            type: getRandomData(Object.keys(HOUSE_TYPES)),
            rooms: getRandomData(ROOMS_AMOUNT),
            guests: getRandomData(GUESTS_AMOUNT),
            checkin: getRandomData(CHECKINS),
            checkout: getRandomData(CHECKOUTS),
            features: shuffleArray(FEATURES).slice(0, getRandomNumber(FEATURES)),
            description: getRandomData(DESCRIPTIONS),
            photos: shuffleArray(PHOTOS_URLS).slice(0, getRandomNumber(PHOTOS_URLS))
          }
        }
    );
  }
  return array;
};

const createPin = (array) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = `${array.location.x - PINS_DISPLACEMENT_X}px`;
  pinElement.style.top = `${array.location.y - PINS_DISPLACEMENT_Y}px`;
  pinElement.querySelector(`img`).src = array.author.avatar;
  pinElement.querySelector(`img`).alt = array.offer.title;

  return pinElement;
};

const createNodeFragment = (pin) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }

  return fragment;
};

const addNodeFragment = (element) => {
  mapPinsNode.appendChild(element);
};
/*
const createCard = (dataObject) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = dataObject.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = dataObject.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${dataObject.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = HOUSE_TYPES[dataObject.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${dataObject.offer.rooms} комнаты для ${dataObject.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = dataObject.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = dataObject.author.avatar;

  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  const photo = popupPhotos.querySelector(`.popup__photo`);
  const fragment = document.createDocumentFragment();
  popupPhotos.removeChild(photo);

  for (let i = 0; i < dataObject.offer.photos.length; i++) {
    fragment.appendChild(photo.cloneNode(true)).src = dataObject.offer.photos[i];
  }
  popupPhotos.appendChild(fragment);

  const popupFeatures = cardElement.querySelector(`.popup__features`);
  const features = popupFeatures.querySelectorAll(`.popup__feature`);
  const pinsClasses = dataObject.offer.features;

  for (let j = 0; j < features.length; j++) {
    let feature = features[j];
    let pinClassName = feature.className.replace(`popup__feature popup__feature--`, ``);
    if (!pinsClasses.includes(pinClassName)) {
      feature.remove();
    }
  }

  return cardElement;
};

const createCardFragment = (cardObj) => {
  const cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(cardObj));

  return cardFragment;
};
*/
const getMainMapPinCoordinateX = () => {
  return parseInt(mapPinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
};

const getMainMapPinCoordinateY = () => {
  return parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT) + (PSEUDO_ELEMENT_PIN_HEIGHT / 2);
};

const passAddressInput = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getMainMapPinCoordinateY()}`;
};

const initPinsScreen = () => {
  const pinsDataArray = createDataArray(PINS_AMOUNT);
  const pinsNodesFragment = createNodeFragment(pinsDataArray);
  addNodeFragment(pinsNodesFragment);
  // const cardNodesFragment = createCardFragment(pinsDataArray[0]);
  // mapNode.insertBefore(cardNodesFragment, mapFilterContainerNode);
  // activeModeOn(mapNode);
};

const validateRoomsInput = () => {
  const validateRooms = ROOMS_FOR_GUESTS[formNode.rooms.value].includes(formNode.capacity.value) ? formNode.capacity.setCustomValidity(``) : formNode.capacity.setCustomValidity(`Не возможно выбрать данное количество гостей`);
  formNode.capacity.reportValidity();
  return validateRooms;
};

toggleDisabledOnFormNodes();

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    onActiveMode();
    initPinsScreen();
    passAddressInput();
  }
}, {
  once: true
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === KeyboardKeys.ENTER) {
    onActiveMode();
    initPinsScreen();
    passAddressInput();
  }
}, {
  once: true
});

formNode.capacity.addEventListener(`input`, validateRoomsInput);
formNode.rooms.addEventListener(`input`, validateRoomsInput);
formSubmit.addEventListener(`click`, validateRoomsInput);

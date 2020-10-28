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
const PRICE = {
  palace: 10000,
  house: 5000,
  flat: 1000,
  bungalow: 0
};
const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};
/*
const MouseKeys = {
  LEFT_CLICK_MOUSE: 0
};
*/
const TitleLength = {
  MIN: 30,
  MAX: 100
};
const PHOTOS_URLS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilterContainerNode = mapNode.querySelector(`.map__filters-container`);
const formFiltersNode = mapFilterContainerNode.querySelector(`.map__filters`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const formNode = document.querySelector(`.ad-form`);

const PINS_AMOUNT = 8;
// const MAX_PRICE_PER_NIGHT = 1000000;
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

let isPageDisabled = false;

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;
  const classListMethod = isPageDisabled ? `add` : `remove`;
  Array.from(formNode.children).forEach((child) => {
    child.disabled = isPageDisabled;
    child.classList[classListMethod](`disable-cursor`);
  });
  Array.from(formFiltersNode.children).forEach((child) => {
    child.disabled = isPageDisabled;
    child.classList[classListMethod](`disable-cursor`);
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

const createNodeFragment = (pin) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pin.length; i++) {
    fragment.appendChild(createPin(pin[i]));
  }

  return fragment;
};

const createСardFragment = (cardObj) => {
  const cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(cardObj));
  return cardFragment;
};

const getMainMapPinCoordinateX = () => {
  return parseInt(mapPinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
};

const getMainMapPinCoordinateY = () => {
  return parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT) + (PSEUDO_ELEMENT_PIN_HEIGHT);
};

const passAddressInput = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getMainMapPinCoordinateY()}`;
  formNode.address.disabled = true;
};

const getCenterMainMapPinCoordinateY = () => {
  return parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT / 2);
};

const passAddressInputCenter = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getCenterMainMapPinCoordinateY()}`;
};

const pinsDataArray = createDataArray(PINS_AMOUNT);

const initPinsScreen = () => {
  const pinsNodesFragment = createNodeFragment(pinsDataArray);
  mapPinsNode.appendChild(pinsNodesFragment);
};
/*
const validateRoomsInput = () => {
  const validateRooms = ROOMS_FOR_GUESTS[formNode.rooms.value].includes(formNode.capacity.value) ? formNode.capacity.setCustomValidity(``) : formNode.capacity.setCustomValidity(`Не возможно выбрать данное количество гостей`);
  formNode.capacity.reportValidity();

  return validateRooms;
};
*/
// const guest1 = document.querySelector(`#capacity`);
// console.log([...guest1.options]);
const room = document.querySelector(`#room_number`);
const guest = document.querySelector(`#capacity`);

const changeRoomNumberValue = (value) => {
  Array.from(guest.options).forEach((option) => {
    option.disabled = !ROOMS_FOR_GUESTS[value].includes(option.value);
  });
  guest.value = value > 3 ? 0 : value;
};
changeRoomNumberValue(room.value);

const validatePriceInput = () => {
  formNode.price.min = PRICE[formNode.type.value];
  formNode.price.placeholder = PRICE[formNode.type.value];
};
/*
const validateMaxPriceInput = () => {
  formNode.price.setAttribute(`max`, MAX_PRICE_PER_NIGHT);
};
*/
const validateTimeSelects = (evt) => {
  if (evt.target === formNode.timein) {
    formNode.timeout.value = formNode.timein.value;
  } else {
    formNode.timein.value = formNode.timeout.value;
  }
};

const validateTitleInput = () => {
  const valueLength = formNode.title.value.length;

  if (valueLength < TitleLength.MIN) {
    formNode.title.setCustomValidity(`Ещё ${TitleLength.MIN - valueLength} символа(ов).`);
  } else if (valueLength > TitleLength.MAX) {
    formNode.title.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} символа(ов).`);
  } else {
    formNode.title.setCustomValidity(``);
  }
  formNode.title.reportValidity();
};

const onFormNodeChange = (evt) => {
  switch (evt.target) {
    /* case formNode.rooms:
    case formNode.capacity:
      validateRoomsInput();
      break;*/
    case formNode.timein:
    case formNode.timeout:
      validateTimeSelects(evt);
      break;
    case formNode.type:
      validatePriceInput();
      break;
  }
};

validatePriceInput();
toggleDisabledOnFormNodes();
passAddressInputCenter();

let cardNode;

const removeActiveCard = () => {
  cardNode.parentNode.removeChild(cardNode);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    removeActiveCard();
  }
};
/*
const renderPinsAndRemoveHandler = (evt) => {
  if (evt.button === MouseKeys.LEFT_CLICK_MOUSE || evt.key === KeyboardKeys.ENTER) {
    onActiveMode();
    initPinsScreen();
    mapPinMain.removeEventListener(`mousedown`, renderPinsAndRemoveHandler);
    mapPinMain.removeEventListener(`keydown`, renderPinsAndRemoveHandler);
  }
};

mapPinMain.addEventListener(`mousedown`, renderPinsAndRemoveHandler);
mapPinMain.addEventListener(`keydown`, renderPinsAndRemoveHandler);
*/
const renderCard = () => {
  onActiveMode();
  initPinsScreen();
  passAddressInput();

  let pinsArr = Array.from(mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`));

  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      cardNode = mapNode.querySelector(`.map__card`);
      if (cardNode) {
        removeActiveCard();
      }
      const cardNodesFragment = createСardFragment(pinsDataArray[index]);
      mapNode.insertBefore(cardNodesFragment, mapFilterContainerNode);
      cardNode = mapNode.querySelector(`.map__card`);
      const closeButton = cardNode.querySelector(`.popup__close`);
      closeButton.addEventListener(`click`, removeActiveCard);
      document.addEventListener(`keydown`, onPopupEscPress);
    });
  });
  mapPinMain.removeEventListener(`click`, renderCard);
};

room.addEventListener(`change`, (evt) => {
  changeRoomNumberValue(evt.target.value);
});
mapPinMain.addEventListener(`click`, renderCard);
formNode.addEventListener(`input`, validateTitleInput);
formNode.addEventListener(`change`, onFormNodeChange);


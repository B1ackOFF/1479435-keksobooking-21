"use strict";

const TITLES = [
  `Дворец однокомнатный`,
  `Квартира на минус первом этаже`,
  `Шалаш у моря`,
  `Утепленный гараж`,
  `Просторная коробка`
];
const HOUSE_TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
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
const MAX_COORDINATE_X = 1150;
const MIN_COORDINATE_X = 50;
const MAX_COORDINATE_Y = 630;
const MIN_COORDINATE_Y = 130;
const MAX_PRICE = 10000;
const MIN_PRICE = 1000;
const PINS_DISPLACEMENT_X = 25;
const PINS_DISPLACEMENT_Y = 35;


const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};

const getRandomData = (arrayName) => {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
            type: getRandomData(HOUSE_TYPES),
            rooms: getRandomData(ROOMS_AMOUNT),
            guests: getRandomData(GUESTS_AMOUNT),
            checkin: getRandomData(CHECKINS),
            checkout: getRandomData(CHECKOUTS),
            features: getRandomData(FEATURES),
            description: ` `,
            photos: getRandomData(PHOTOS_URLS)
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

const initPinsScreen = () => {
  const pinsDataArray = createDataArray(PINS_AMOUNT);
  const pinsNodesFragment = createNodeFragment(pinsDataArray);

  addNodeFragment(pinsNodesFragment);

  activeModeOn(mapNode);
};

initPinsScreen();

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
  `Шикарное маленькое жилище на окраине города. Рядом большой парк, 30 минут до центра на вертолете! Удобства на улице. Звонить сне ранее, чем с 11-00 и не позднее 20-00`,
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
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFilterContainerNode = mapNode.querySelector(`.map__filters-container`);

const activeModeOn = (element) => {
  element.classList.remove(`map--faded`);
};

/* функция возвращающая неповторяющееся рандомное число
const nonRepeatingRandomNumber = (minNumber, maxNumber) => {
  let totalNumbers = maxNumber - minNumber + 1;
  let arrayTotalNumbers = [];
  let arrayRandomNumbers = [];
  let tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + minNumber);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }

  return arrayRandomNumbers;
};
*/

const getRandomData = (arrayName) => {
  return arrayName[Math.floor(Math.random() * arrayName.length)];
};
const getRandomNumber = (arrName) => {
  return [Math.floor(Math.random() * arrName.length)];
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
            type: getRandomData(Object.keys(HOUSE_TYPES)),
            rooms: getRandomData(ROOMS_AMOUNT),
            guests: getRandomData(GUESTS_AMOUNT),
            checkin: getRandomData(CHECKINS),
            checkout: getRandomData(CHECKOUTS),
            features: getRandomData(FEATURES),
            description: getRandomData(DESCRIPTIONS),
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
  cardElement.querySelector(`.popup__photo`).src = dataObject.offer.photos;

  const featureNodes = cardElement.querySelectorAll(`.popup__feature`);
  for (let i = 0; i < featureNodes.length; i++) {
    featureNodes[i].style.display = `none`;
  }
  for (let j = 0; j < featureNodes.length; j++) {
    featureNodes[getRandomNumber(FEATURES)].style.display = `inline-block`;
  }

  return cardElement;
};

const createCardFragment = (cardObj) => {
  const cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(cardObj));

  return cardFragment;
};

const initPinsScreen = () => {
  const pinsDataArray = createDataArray(PINS_AMOUNT);
  const pinsNodesFragment = createNodeFragment(pinsDataArray);
  const cardNodesFragment = createCardFragment(pinsDataArray[0]);
  addNodeFragment(pinsNodesFragment);
  mapNode.insertBefore(cardNodesFragment, mapFilterContainerNode);
  activeModeOn(mapNode);
};

initPinsScreen();

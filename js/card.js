"use strict";

const HOUSE_TYPE = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Замок`,
  house: `Дом`
};
const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


const createCard = (dataObject) => {
  const cardElement = mapCardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = dataObject.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = dataObject.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${dataObject.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = HOUSE_TYPE[dataObject.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${dataObject.offer.rooms} комнаты для ${dataObject.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = dataObject.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = dataObject.author.avatar;

  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  const photo = popupPhotos.querySelector(`.popup__photo`);
  const fragment = document.createDocumentFragment();
  popupPhotos.removeChild(photo);

  const photosArray = dataObject.offer.photos;
  photosArray.forEach((elem, index) => {
    fragment.appendChild(photo.cloneNode(true)).src = dataObject.offer.photos[index];
  });

  popupPhotos.appendChild(fragment);

  const popupFeatures = cardElement.querySelector(`.popup__features`);
  const features = popupFeatures.querySelectorAll(`.popup__feature`);
  const pinsClasses = dataObject.offer.features;

  features.forEach((element) => {
    let pinClassName = element.className.replace(`popup__feature popup__feature--`, ``);
    if (!pinsClasses.includes(pinClassName)) {
      element.remove();
    }
  });

  return cardElement;
};

const createCardFragment = (cardObj) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(cardObj));
  return fragment;
};

const addCardNode = (arrays) => {
  let pins = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  pins.forEach((element, index) => {
    element.addEventListener(`click`, () => {

      pins.forEach((elem) => {
        elem.classList.remove(`.map__pin--active`);
      });

      window.map.removeActiveCardHandler();
      const cardNodesFragment = createCardFragment(arrays[index]);
      cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCardHandler);
      document.addEventListener(`keydown`, window.util.onPopupEscPress);
      window.pin.mapNode.insertBefore(cardNodesFragment, window.activate.mapFiltersNode);
      element.classList.add(`.map__pin--active`);
    });
  });
};

window.card = {
  addNode: addCardNode
};

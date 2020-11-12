"use strict";

const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const HOUSE_TYPES = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Замок`,
  house: `Дом`
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

const createСardFragment = (cardObj) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(cardObj));
  return fragment;
};

const addCardNode = (array) => {
  let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsArr.forEach((element, index) => {
    element.addEventListener(`click`, () => {
      window.map.removeActiveCard();
      const cardNodesFragment = createСardFragment(array[index]);
      cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
      document.addEventListener(`keydown`, window.util.onPopupEscPress);
      window.pin.mapNode.insertBefore(cardNodesFragment, window.activate.mapFiltersNode);
    });
  });
};

window.card = {
  createСardFragment,
  addCardNode
};

"use strict";

const mapPinMain = document.querySelector(`.map__pin--main`);

const initPinsScreen = (arrays) => {
  const pinsNodesFragment = window.pin.createNodeFragment(arrays);
  window.pin.mapPinsNode.appendChild(pinsNodesFragment);
};

const removeActiveCardHandler = () => {
  const cardNode = window.pin.mapNode.querySelector(`.map__card`);
  if (cardNode) {
    cardNode.parentNode.removeChild(cardNode);
    document.removeEventListener(`keydown`, window.util.onPopupEscPress);
    cardNode.classList.remove(`.map__pin--active`);
  }
};

window.map = {
  pinMain: mapPinMain,
  initPinsScreen,
  removeActiveCardHandler
};

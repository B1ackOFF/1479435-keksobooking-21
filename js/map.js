"use strict";

window.map = {
  mapPinMain: document.querySelector(`.map__pin--main`),

  initPinsScreen: (array) => {
    const pinsNodesFragment = window.pin.createNodeFragment(array);
    window.pin.mapPinsNode.appendChild(pinsNodesFragment);
  },

  removeActiveCard: () => {
    const cardNode = window.pin.mapNode.querySelector(`.map__card`);
    if (cardNode) {
      cardNode.parentNode.removeChild(cardNode);
      document.removeEventListener(`keydown`, window.util.onPopupEscPress);
    }
  }
};

"use strict";

(()=> {
  const mapNode = document.querySelector(`.map`);
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const PINS_DISPLACEMENT_X = PIN_WIDTH / 2;
  const PINS_DISPLACEMENT_Y = PIN_HEIGHT / 2;

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

  const removePins = () => {
    const pinsNode = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pinNode of pinsNode) {
      pinNode.parentNode.removeChild(pinNode);
    }
  };

  window.pin = {
    mapNode: document.querySelector(`.map`),
    mapPinsNode: mapNode.querySelector(`.map__pins`),
    createNodeFragment,
    removePins


  };
})();

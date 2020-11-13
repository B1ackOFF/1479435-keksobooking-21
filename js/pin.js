"use strict";

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PINS_DISPLACEMENT_X = PIN_WIDTH / 2;
const PINS_DISPLACEMENT_Y = PIN_HEIGHT / 2;
const mapNode = document.querySelector(`.map`);
const mapPinsNode = mapNode.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


const createPin = (arrays) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = `${arrays.location.x - PINS_DISPLACEMENT_X}px`;
  pinElement.style.top = `${arrays.location.y - PINS_DISPLACEMENT_Y}px`;
  pinElement.querySelector(`img`).src = arrays.author.avatar;
  pinElement.querySelector(`img`).alt = arrays.offer.title;

  return pinElement;
};

const createNodeFragment = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.forEach((element, index) => {
    fragment.appendChild(createPin(pins[index]));
  });

  return fragment;
};

const removePins = () => {
  const pinsNode = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let pinNode of pinsNode) {
    pinNode.parentNode.removeChild(pinNode);
  }
};

window.pin = {
  mapNode,
  mapPinsNode,
  createNodeFragment,
  removePins
};

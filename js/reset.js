"use strict";

const DEFAULT_PRICE = 1000;
const StartingPositionMapPinMain = {
  AXIS_X: `570px`,
  AXIS_Y: `375px`,
};
const mainNode = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);


const createMessageElement = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessageElement);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress);
  successMessageElement.addEventListener(`click`, removeMessageElementHandler);
};

const removeMessageElementHandler = () => {
  const succesMessageElement = mainNode.querySelector(`.success`);
  const errorMessageElement = mainNode.querySelector(`.error`);
  if (succesMessageElement) {
    succesMessageElement.parentNode.removeChild(succesMessageElement);
    document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
  } else {
    errorMessageElement.parentNode.removeChild(errorMessageElement);
    document.removeEventListener(`keydown`, window.util.onPopupMessageEscPress);
  }
};

const resetPage = () => {
  window.pin.mapNode.classList.add(`map--faded`);
  window.form.node.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.removePins();

  window.form.node.reset();
  window.activate.formFiltersNode.reset();

  window.form.node.price.placeholder = DEFAULT_PRICE;
  window.form.node.price.min = DEFAULT_PRICE;

  window.map.pinMain.style.left = StartingPositionMapPinMain.AXIS_X;
  window.map.pinMain.style.top = StartingPositionMapPinMain.AXIS_Y;
  window.form.passAddressInput(window.move.mainPinSize.CIRCLE.WIDTH, window.move.mainPinSize.CIRCLE.HEIGHT);

  window.map.removeActiveCardHandler();

  window.images.previewHousing.classList.add(`hidden`);
  window.images.previewHousing.src = ``;
  window.images.previewAvatar.src = `img/muffin-grey.svg`;

  window.map.pinMain.addEventListener(`mousedown`, window.activate.onPinMainClickOrEnterPress);
  window.map.pinMain.addEventListener(`keydown`, window.activate.onPinMainClickOrEnterPress);
};

window.reset = {
  page: resetPage,
  removeMessageElementHandler,
  mainNode,
  createMessageElement
};

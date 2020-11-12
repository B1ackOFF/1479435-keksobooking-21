"use strict";

const mainNode = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const startingPositionMapPinMain = {
  AXIS_X: `570px`,
  AXIS_Y: `375px`,
};

const createMessageElement = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  mainNode.appendChild(successMessageElement);

  document.addEventListener(`keydown`, window.util.onPopupMessageEscPress);
  successMessageElement.addEventListener(`click`, removeMessageElement);
};

const removeMessageElement = () => {
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

  window.map.pinMain.style.left = startingPositionMapPinMain.AXIS_X;
  window.map.pinMain.style.top = startingPositionMapPinMain.AXIS_Y;
  window.form.passAddressInput(window.move.mainPinSize.CIRCLE.WIDTH, window.move.mainPinSize.CIRCLE.HEIGHT);

  window.map.removeActiveCard();

  window.images.previewHousing.classList.add(`hidden`);
  window.images.previewHousing.src = ``;
  window.images.previewAvatar.src = `img/muffin-grey.svg`;

  window.map.pinMain.addEventListener(`mousedown`, window.activate.onPinMainClickOrEnterPress);
  window.map.pinMain.addEventListener(`keydown`, window.activate.onPinMainClickOrEnterPress);
};

window.reset = {
  page: resetPage,
  removeMessageElement,
  mainNode,
  createMessageElement
};

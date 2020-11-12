"use strict";

const mainNode = document.querySelector(`main`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const startingPositionMapPinMain = {
  axisX: `570px`,
  axisY: `375px`,
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
  window.form.formNode.classList.add(`ad-form--disabled`);

  window.activate.toggleDisabledOnFormNodes();

  window.pin.removePins();

  window.form.formNode.reset();
  window.activate.formFiltersNode.reset();

  window.map.mapPinMain.style.left = startingPositionMapPinMain.axisX;
  window.map.mapPinMain.style.top = startingPositionMapPinMain.axisY;
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);

  window.map.removeActiveCard();

  window.images.previewHousing.classList.add(`hidden`);
  window.images.previewHousing.src = ``;
  window.images.previewAvatar.src = `img/muffin-grey.svg`;

  window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainClickOrEnterPress);
  window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainClickOrEnterPress);
};

window.reset = {
  resetPage,
  removeMessageElement,
  mainNode,
  createMessageElement
};

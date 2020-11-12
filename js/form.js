"use strict";

const ROOMS_FOR_GUESTS = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const PSEUDO_ELEMENT_PIN_HEIGHT = 22;
const typeHouse = {
  PALACE: `palace`,
  HOUSE: `house`,
  FLAT: `flat`,
  BUNGALOW: `bungalow`
};
const Price = {
  [typeHouse.PALACE]: 10000,
  [typeHouse.HOUSE]: 5000,
  [typeHouse.FLAT]: 1000,
  [typeHouse.BUNGALOW]: 0
};

const titleLength = {
  MIN: 30,
  MAX: 100
};
const formNode = document.querySelector(`.ad-form`);
const formResetButton = formNode.querySelector(`.ad-form__reset`);
const room = document.querySelector(`#room_number`);
const guest = document.querySelector(`#capacity`);

const getMainMapPinCoordinateX = () => {
  return parseInt(window.map.pinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
};

const getMainMapPinCoordinateY = () => {
  return parseInt(window.map.pinMain.style.top, 10) + (MAIN_PIN_HEIGHT) + (PSEUDO_ELEMENT_PIN_HEIGHT);
};

const getCenterMainMapPinCoordinateY = () => {
  return parseInt(window.map.pinMain.style.top, 10) + (MAIN_PIN_HEIGHT / 2);
};

const passAddressInputCenter = () => {
  formNode.address.value = `${getMainMapPinCoordinateX()}, ${getCenterMainMapPinCoordinateY()}`;
};
const passAddressInput = (pinWidth, pinHeight) => {
  formNode.address.value = `${getMainMapPinCoordinateX(pinWidth)}, ${getMainMapPinCoordinateY(pinHeight)}`;
  formNode.address.readOnly = true;
};
const changeRoomNumberValue = (value) => {
  Array.from(guest.options).forEach((option) => {
    option.disabled = !ROOMS_FOR_GUESTS[value].includes(option.value);
  });
  guest.value = value > 3 ? 0 : value;
};
changeRoomNumberValue(room.value);

const validatePriceInput = () => {
  formNode.price.min = Price[formNode.type.value];
  formNode.price.placeholder = Price[formNode.type.value];
};

const validateTimeSelects = (evt) => {
  if (evt.target === formNode.timein) {
    formNode.timeout.value = formNode.timein.value;
  } else {
    formNode.timein.value = formNode.timeout.value;
  }
};

const validateTitleInput = () => {
  const valueLength = formNode.title.value.length;

  if (valueLength < titleLength.MIN) {
    formNode.title.setCustomValidity(`Ещё ${titleLength.MIN - valueLength} символа(ов).`);
  } else if (valueLength > titleLength.MAX) {
    formNode.title.setCustomValidity(`Удалите лишние ${valueLength - titleLength.MAX} символа(ов).`);
  } else {
    formNode.title.setCustomValidity(``);
  }
  formNode.title.reportValidity();
};

const onFormNodeChange = (evt) => {
  switch (evt.target) {
    case formNode.timein:
    case formNode.timeout:
      validateTimeSelects(evt);
      break;
    case formNode.type:
      validatePriceInput();
      break;
  }
};

formNode.addEventListener(`input`, validateTitleInput);
formNode.addEventListener(`change`, onFormNodeChange);
room.addEventListener(`change`, (evt) => {
  changeRoomNumberValue(evt.target.value);
});

formNode.addEventListener(`submit`, (evt) => {
  window.backend.upload(new FormData(formNode), window.reset.page);
  window.reset.createMessageElement();
  evt.preventDefault();
});

formResetButton.addEventListener(`click`, (evt) => {
  window.reset.page();
  evt.preventDefault();
});

validatePriceInput();
passAddressInputCenter();
window.activate.toggleDisabledOnFormNodes();
passAddressInput(window.move.mainPinSize.CIRCLE.WIDTH, window.move.mainPinSize.CIRCLE.HEIGHT);
window.map.pinMain.addEventListener(`mousedown`, window.activate.onPinMainClickOrEnterPress);
window.map.pinMain.addEventListener(`keydown`, window.activate.onPinMainClickOrEnterPress);

window.form = {
  node: formNode,
  passAddressInput
};

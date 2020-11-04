"use strict";

(()=>{
  const ROOMS_FOR_GUESTS = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };
  const PRICE = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalow: 0
  };
  const TitleLength = {
    MIN: 30,
    MAX: 100
  };
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const PSEUDO_ELEMENT_PIN_HEIGHT = 22;
  const formNode = document.querySelector(`.ad-form`);
  const formResetButton = formNode.querySelector(`.ad-form__reset`);
  const room = document.querySelector(`#room_number`);
  const guest = document.querySelector(`#capacity`);

  const getMainMapPinCoordinateX = () => {
    return parseInt(window.map.mapPinMain.style.left, 10) + (MAIN_PIN_WIDTH / 2);
  };

  const getMainMapPinCoordinateY = () => {
    return parseInt(window.map.mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT) + (PSEUDO_ELEMENT_PIN_HEIGHT);
  };

  const getCenterMainMapPinCoordinateY = () => {
    return parseInt(window.map.mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT / 2);
  };

  const passAddressInputCenter = () => {
    formNode.address.value = `${getMainMapPinCoordinateX()}, ${getCenterMainMapPinCoordinateY()}`;
  };
  const passAddressInput = (pinWidth, pinHeight) => {
    window.form.formNode.address.value = `${getMainMapPinCoordinateX(pinWidth)}, ${getMainMapPinCoordinateY(pinHeight)}`;
    window.form.formNode.address.disabled = true;
  };
  const changeRoomNumberValue = (value) => {
    Array.from(guest.options).forEach((option) => {
      option.disabled = !ROOMS_FOR_GUESTS[value].includes(option.value);
    });
    guest.value = value > 3 ? 0 : value;
  };
  changeRoomNumberValue(room.value);

  const validatePriceInput = () => {
    formNode.price.min = PRICE[formNode.type.value];
    formNode.price.placeholder = PRICE[formNode.type.value];
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

    if (valueLength < TitleLength.MIN) {
      formNode.title.setCustomValidity(`Ещё ${TitleLength.MIN - valueLength} символа(ов).`);
    } else if (valueLength > TitleLength.MAX) {
      formNode.title.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} символа(ов).`);
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

  validatePriceInput();
  passAddressInputCenter();

  formNode.addEventListener(`input`, validateTitleInput);
  formNode.addEventListener(`change`, onFormNodeChange);
  room.addEventListener(`change`, (evt) => {
    changeRoomNumberValue(evt.target.value);
  });

  formNode.addEventListener(`submit`, (evt) => {
    window.data.upload(new FormData(formNode), window.reset.page);
    window.reset.createMessageElement();
    evt.preventDefault();
  });

  formResetButton.addEventListener(`click`, (evt) => {
    window.reset.page();
    evt.preventDefault();
  });

  window.form = {
    formNode,
    passAddressInput
  };
})();

"use strict";

const mapFilterContainerNode = window.pin.mapNode.querySelector(`.map__filters-container`);
const formFiltersNode = mapFilterContainerNode.querySelector(`.map__filters`);
const formNode = document.querySelector(`.ad-form`);

let isPageDisabled = false;

const toggleDisabledOnFormNodes = () => {
  isPageDisabled = !isPageDisabled;
  const classListMethod = isPageDisabled ? `add` : `remove`;
  Array.from(formNode.children).forEach((child) => {
    child.disabled = isPageDisabled;
    child.classList[classListMethod](`disable-cursor`);
  });
  Array.from(formFiltersNode.children).forEach((child) => {
    child.disabled = isPageDisabled;
    child.classList[classListMethod](`disable-cursor`);
  });
};

const onActiveMode = (array) => {
  //  const simillarPinsArray = array.concat();
  window.pin.mapNode.classList.remove(`map--faded`);
  window.form.formNode.classList.remove(`ad-form--disabled`);
  toggleDisabledOnFormNodes();
  window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
  window.map.initPinsScreen(array);

  window.filter.updateSimillarPins(array);
  const filterPins = window.debounce.debounce(() => {
    window.filter.updateSimillarPins(array);
  });
  formFiltersNode.addEventListener(`change`, filterPins);
};

const onPinMainClickOrEnterPress = (evt) => {
  if (evt.button === window.util.MouseButtons.MAIN || evt.key === window.util.KeyboardKeys.ENTER) {
    evt.preventDefault();
    window.backend.load(onActiveMode);
    window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainClickOrEnterPress);
    window.map.mapPinMain.removeEventListener(`keydown`, onPinMainClickOrEnterPress);
  }
};

window.activate = {
  toggleDisabledOnFormNodes,
  onPinMainClickOrEnterPress,
  mapFilterContainerNode,
  formFiltersNode
};

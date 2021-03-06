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

const onActiveMode = (arrays) => {
  window.pin.mapNode.classList.remove(`map--faded`);
  window.form.node.classList.remove(`ad-form--disabled`);
  toggleDisabledOnFormNodes();
  window.form.passAddressInput(window.move.mainPinSize.PIN.WIDTH, window.move.mainPinSize.PIN.HEIGHT);
  window.map.initPinsScreen(arrays);

  window.filter.updateSimillarPins(arrays);
  const filterPinsHandler = window.util.debounce(() => {
    window.filter.updateSimillarPins(arrays);
  });
  formFiltersNode.addEventListener(`change`, filterPinsHandler);
};

const onPinMainClickOrEnterPress = (evt) => {
  if (evt.button === window.util.MouseButtons.MAIN || evt.key === window.util.KeyboardKeys.ENTER) {
    evt.preventDefault();
    window.backend.load(onActiveMode);
    window.map.pinMain.removeEventListener(`mousedown`, onPinMainClickOrEnterPress);
    window.map.pinMain.removeEventListener(`keydown`, onPinMainClickOrEnterPress);
  }
};

window.activate = {
  toggleDisabledOnFormNodes,
  onPinMainClickOrEnterPress,
  mapFilterContainerNode,
  formFiltersNode
};

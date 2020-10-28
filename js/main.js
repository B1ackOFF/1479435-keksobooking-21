"use strict";

(()=>{
  const mapFilterContainerNode = window.pin.mapNode.querySelector(`.map__filters-container`);
  const formFiltersNode = mapFilterContainerNode.querySelector(`.map__filters`);

  let isPageDisabled = false;

  const toggleDisabledOnFormNodes = () => {
    isPageDisabled = !isPageDisabled;
    const classListMethod = isPageDisabled ? `add` : `remove`;
    Array.from(window.form.formNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList[classListMethod](`disable-cursor`);
    });
    Array.from(formFiltersNode.children).forEach((child) => {
      child.disabled = isPageDisabled;
      child.classList[classListMethod](`disable-cursor`);
    });
  };

  const onActiveMode = () => {
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
  };

  toggleDisabledOnFormNodes();

  const onPinsClick = () => {
    let pinsArr = Array.from(window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`));
    pinsArr.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.map.removeActiveCard();
        const cardNodesFragment = window.card.createСardFragment(window.data.pinsDataArray[index]);
        cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
        document.addEventListener(`keydown`, window.util.onPopupEscPress);
        window.pin.mapNode.insertBefore(cardNodesFragment, mapFilterContainerNode);
      });
    });
  };

  const onPinMainClickOrEnterPress = (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN || evt.key === window.util.KeyboardKeys.ENTER) {
      evt.preventDefault();
      onActiveMode();
      window.map.initPinsScreen();
      onPinsClick();
      window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainClickOrEnterPress);
      window.map.mapPinMain.removeEventListener(`keydown`, onPinMainClickOrEnterPress);
    }
  };

  window.map.mapPinMain.addEventListener(`mousedown`, onPinMainClickOrEnterPress);
  window.map.mapPinMain.addEventListener(`keydown`, onPinMainClickOrEnterPress);
})();

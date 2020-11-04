"use strict";
(()=>{
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
    window.pin.mapNode.classList.remove(`map--faded`);
    window.form.formNode.classList.remove(`ad-form--disabled`);
    toggleDisabledOnFormNodes();
    window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH, window.move.MainPinSize.pin.HEIGHT);
    window.map.initPinsScreen(array);
    onPinsClick(array);
  };

  const onPinsClick = (array) => {
    let pinsArr = window.pin.mapPinsNode.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinsArr.forEach((element, index) => {
      element.addEventListener(`click`, () => {
        window.map.removeActiveCard();
        const cardNodesFragment = window.card.createСardFragment(array[index]);
        cardNodesFragment.querySelector(`.popup__close`).addEventListener(`click`, window.map.removeActiveCard);
        document.addEventListener(`keydown`, window.util.onPopupEscPress);
        window.pin.mapNode.insertBefore(cardNodesFragment, mapFilterContainerNode);
      });
    });
  };

  const onPinMainClickOrEnterPress = (evt) => {
    if (evt.button === window.util.MouseButtons.MAIN || evt.key === window.util.KeyboardKeys.ENTER) {
      evt.preventDefault();
      window.data.load(onActiveMode);
      window.map.mapPinMain.removeEventListener(`mousedown`, onPinMainClickOrEnterPress);
      window.map.mapPinMain.removeEventListener(`keydown`, onPinMainClickOrEnterPress);
    }
  };

  window.activate = {
    toggleDisabledOnFormNodes,
    onPinMainClickOrEnterPress,
    mapFilterContainerNode
  };
})();

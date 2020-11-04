"use strict";
(() => {
  window.activate.toggleDisabledOnFormNodes();
  window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH, window.move.MainPinSize.circle.HEIGHT);
  window.map.mapPinMain.addEventListener(`mousedown`, window.activate.onPinMainClickOrEnterPress);
  window.map.mapPinMain.addEventListener(`keydown`, window.activate.onPinMainClickOrEnterPress);
})();


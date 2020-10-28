"use strict";

(()=> {
  const dialogHandle = window.pin.mapPinsNode.querySelector(`.map__pin--main`);

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialogHandle.style.top = (dialogHandle.offsetTop - shift.y) + `px`;
      dialogHandle.style.left = (dialogHandle.offsetLeft - shift.x) + `px`;
      window.form.passAddressInput();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.pin.mapPinsNode.removeEventListener(`mousemove`, onMouseMove);
      window.pin.mapPinsNode.removeEventListener(`mouseup`, onMouseUp);
    };

    window.pin.mapPinsNode.addEventListener(`mousemove`, onMouseMove);
    window.pin.mapPinsNode.addEventListener(`mouseup`, onMouseUp);
  });
})();

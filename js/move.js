"use strict";

const mainPinSize = {
  CIRCLE: {
    WIDTH: 62,
    HEIGHT: 62
  },
  PIN: {
    WIDTH: 62,
    HEIGHT: 84
  }
};
const coordinates = {
  Y: {
    MAX: 630 - mainPinSize.PIN.HEIGHT,
    MIN: 130 - mainPinSize.PIN.HEIGHT
  },
  X: {
    MAX: window.pin.mapNode.offsetWidth - (mainPinSize.PIN.WIDTH / 2),
    MIN: -(mainPinSize.PIN.WIDTH / 2)
  }
};

window.map.pinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    const coordinatesMainPin = {
      x: window.map.pinMain.offsetLeft - shift.x,
      y: window.map.pinMain.offsetTop - shift.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (coordinatesMainPin.x >= coordinates.X.MIN && coordinatesMainPin.x <= coordinates.X.MAX) {
      window.map.pinMain.style.left = `${coordinatesMainPin.x}px`;
    }

    if (coordinatesMainPin.y >= coordinates.Y.MIN && coordinatesMainPin.y <= coordinates.Y.MAX) {
      window.map.pinMain.style.top = `${coordinatesMainPin.y}px`;
    }

    window.form.passAddressInput();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    window.pin.mapPinsNode.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  window.pin.mapPinsNode.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.move = {
  mainPinSize
};

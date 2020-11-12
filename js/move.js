"use strict";

const MainPinSize = {
  circle: {
    WIDTH: 62,
    HEIGHT: 62
  },
  pin: {
    WIDTH: 62,
    HEIGHT: 84
  }
};

const Coordinates = {
  Y: {
    MAX: 630 - MainPinSize.pin.HEIGHT,
    MIN: 130 - MainPinSize.pin.HEIGHT
  },
  X: {
    MAX: window.pin.mapNode.offsetWidth - (MainPinSize.pin.WIDTH / 2),
    MIN: -(MainPinSize.pin.WIDTH / 2)
  }
};

window.map.mapPinMain.addEventListener(`mousedown`, function (evt) {
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

    const CoordinatesMainPin = {
      x: window.map.mapPinMain.offsetLeft - shift.x,
      y: window.map.mapPinMain.offsetTop - shift.y
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (CoordinatesMainPin.x >= Coordinates.X.MIN && CoordinatesMainPin.x <= Coordinates.X.MAX) {
      window.map.mapPinMain.style.left = `${CoordinatesMainPin.x}px`;
    }

    if (CoordinatesMainPin.y >= Coordinates.Y.MIN && CoordinatesMainPin.y <= Coordinates.Y.MAX) {
      window.map.mapPinMain.style.top = `${CoordinatesMainPin.y}px`;
    }

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

window.move = {
  MainPinSize
};

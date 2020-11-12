"use strict";

const DEBOUNCE_INTERVAL = 500;

const KeyboardKeys = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};
const MouseButtons = {
  MAIN: 0
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

const getRandomData = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (array) => {
  return [Math.floor(Math.random() * array.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

const onPopupEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    window.map.removeActiveCard();
  }
};

const onPopupMessageEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    window.reset.removeMessageElement();
  }
};

window.util = {
  getRandomData,
  getRandomNumber,
  getRandomInRange,
  shuffleArray,
  onPopupEscPress,
  onPopupMessageEscPress,
  debounce,
  MouseButtons,
  KeyboardKeys
};

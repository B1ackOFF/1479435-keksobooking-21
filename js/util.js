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

const getRandomData = (arrays) => {
  return arrays[Math.floor(Math.random() * arrays.length)];
};

const getRandomNumber = (arrays) => {
  return [Math.floor(Math.random() * arrays.length)];
};

const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = (arrays) => {
  const results = [...arrays];
  for (let i = results.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = results[i];
    results[i] = results[j];
    results[j] = temp;
  }
  return results;
};

const onPopupEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    window.map.removeActiveCardHandler();
  }
};

const onPopupMessageEscPress = (evt) => {
  if (evt.key === KeyboardKeys.ESCAPE) {
    evt.preventDefault();
    window.reset.removeMessageElementHandler();
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

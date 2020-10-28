"use strict";

(()=>{
  const KeyboardKeys = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
  };
  const MouseButtons = {
    MAIN: 0
  };

  window.util = {
    getRandomData: (array) => {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomNumber: (array) => {
      return [Math.floor(Math.random() * array.length)];
    },
    getRandomInRange: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffleArray: (array) => {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    },
    onPopupEscPress: (evt) => {
      if (evt.key === KeyboardKeys.ESCAPE) {
        evt.preventDefault();
        window.map.removeActiveCard();
      }
    },
    MouseButtons,
    KeyboardKeys
  };

})();

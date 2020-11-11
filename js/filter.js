"use strict";

(() => {
  const RoomPrice = {
    low: 10000,
    high: 50000
  };

  const MAX_SIMILLAR_PINS_COUNT = 5;

  const FILTER_DEFAULT_VALUE = `any`;

  const checkBoxes = Array.from(window.activate.formFiltersNode.features);

  const updateSimillarPins = (array) => {

    const filterPinsByType = (pinSimmillar) => {
      if (window.activate.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
        return array;
      } else {
        return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
      }
    };

    const filterPinsByRooms = (pinSimmillar) => {
      if (window.activate.formFiltersNode[`housing-rooms`].value === FILTER_DEFAULT_VALUE) {
        return array;
      } else {
        return parseInt(pinSimmillar.offer[`rooms`], 10) === parseInt(window.activate.formFiltersNode[`housing-rooms`].value, 10);
      }
    };

    const filterPinsByGuests = (pinSimmillar) => {
      if (window.activate.formFiltersNode[`housing-guests`].value === FILTER_DEFAULT_VALUE) {
        return array;
      } else {
        return parseInt(pinSimmillar.offer[`guests`], 10) === parseInt(window.activate.formFiltersNode[`housing-guests`].value, 10);
      }
    };

    const filterPinsByPrice = (pinSimmillar) => {
      switch (window.activate.formFiltersNode[`housing-price`].value) {
        case `low`:
          return pinSimmillar.offer.price < RoomPrice.low;
        case `middle`:
          return pinSimmillar.offer.price >= RoomPrice.low && pinSimmillar.offer.price <= RoomPrice.high;
        case `high`:
          return pinSimmillar.offer.price > RoomPrice.high;
        default:
          return array;
      }
    };

    const filterPinsByFeatures = function (pinSimmillar) {
      return !checkBoxes.some(function (element) {
        return element.checked && !pinSimmillar.offer.features.includes(element.value);
      });
    };

    const newArray = array.filter(filterPinsByType)
    .filter(filterPinsByRooms)
    .filter(filterPinsByGuests)
    .filter(filterPinsByPrice)
    .filter(filterPinsByPrice)
    .filter(filterPinsByFeatures)
    .slice(0, MAX_SIMILLAR_PINS_COUNT);


    window.map.removeActiveCard();
    window.pin.removePins();
    window.map.initPinsScreen(newArray);
    window.card.addCardNode(newArray);
  };

  window.filter = {
    updateSimillarPins
  };
})();


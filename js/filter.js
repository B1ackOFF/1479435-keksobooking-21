"use strict";

const MAX_SIMILLAR_PINS_COUNT = 5;
const FILTER_DEFAULT_VALUE = `any`;
const checkBoxes = Array.from(window.activate.formFiltersNode.features);
const roomPrice = {
  LOW: 10000,
  HIGH: 50000
};

const updateSimillarPins = (array) => {
  const simillarPinsArray = array.concat();
  const filterPinsByType = (pinSimmillar) => {
    if (window.activate.formFiltersNode[`housing-type`].value === FILTER_DEFAULT_VALUE) {
      return simillarPinsArray;
    } else {
      return pinSimmillar.offer.type === window.activate.formFiltersNode[`housing-type`].value;
    }
  };

  const filterPinsByRooms = (pinSimmillar) => {
    if (window.activate.formFiltersNode[`housing-rooms`].value === FILTER_DEFAULT_VALUE) {
      return simillarPinsArray;
    } else {
      return parseInt(pinSimmillar.offer[`rooms`], 10) === parseInt(window.activate.formFiltersNode[`housing-rooms`].value, 10);
    }
  };

  const filterPinsByGuests = (pinSimmillar) => {
    if (window.activate.formFiltersNode[`housing-guests`].value === FILTER_DEFAULT_VALUE) {
      return simillarPinsArray;
    } else {
      return parseInt(pinSimmillar.offer[`guests`], 10) === parseInt(window.activate.formFiltersNode[`housing-guests`].value, 10);
    }
  };

  const filterPinsByPrice = (pinSimmillar) => {
    switch (window.activate.formFiltersNode[`housing-price`].value) {
      case `low`:
        return pinSimmillar.offer.price < roomPrice.LOW;
      case `middle`:
        return pinSimmillar.offer.price >= roomPrice.LOW && pinSimmillar.offer.price <= roomPrice.HIGH;
      case `high`:
        return pinSimmillar.offer.price > roomPrice.HIGH;
      default:
        return simillarPinsArray;
    }
  };

  const filterPinsByFeatures = function (pinSimmillar) {
    return !checkBoxes.some(function (element) {
      return element.checked && !pinSimmillar.offer.features.includes(element.value);
    });
  };

  const filteredPins = simillarPinsArray.filter(filterPinsByType)
  .filter(filterPinsByRooms)
  .filter(filterPinsByGuests)
  .filter(filterPinsByPrice)
  .filter(filterPinsByPrice)
  .filter(filterPinsByFeatures)
  .slice(0, MAX_SIMILLAR_PINS_COUNT);


  window.map.removeActiveCard();
  window.pin.removePins();
  window.map.initPinsScreen(filteredPins);
  window.card.addNode(filteredPins);
};

window.filter = {
  updateSimillarPins
};

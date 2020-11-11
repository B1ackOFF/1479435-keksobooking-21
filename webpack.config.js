const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/activate.js",
    "./js/backend.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/move.js",
    "./js/reset.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
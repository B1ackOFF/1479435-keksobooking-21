const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/move.js",
    "./js/activate.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/reset.js",
    "./js/images.js",
    "./js/form.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

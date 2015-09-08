"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntryModel = function EntryModel() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$id = _ref.id;
  var id = _ref$id === undefined ? 0 : _ref$id;
  var _ref$startTime = _ref.startTime;
  var startTime = _ref$startTime === undefined ? new Date() : _ref$startTime;
  var _ref$poo = _ref.poo;
  var poo = _ref$poo === undefined ? false : _ref$poo;
  var _ref$pee = _ref.pee;
  var pee = _ref$pee === undefined ? false : _ref$pee;
  var _ref$feedingMethod = _ref.feedingMethod;
  var feedingMethod = _ref$feedingMethod === undefined ? 0 : _ref$feedingMethod;
  var _ref$feedingAmount = _ref.feedingAmount;
  var feedingAmount = _ref$feedingAmount === undefined ? 0 : _ref$feedingAmount;
  var _ref$feedingMinutes = _ref.feedingMinutes;
  var feedingMinutes = _ref$feedingMinutes === undefined ? 0 : _ref$feedingMinutes;
  var _ref$feedingSeconds = _ref.feedingSeconds;
  var feedingSeconds = _ref$feedingSeconds === undefined ? 0 : _ref$feedingSeconds;

  _classCallCheck(this, EntryModel);

  this.id = id;
  this.startTime = new Date(startTime);
  this.poo = poo;
  this.pee = pee;
  this.feedingMethod = feedingMethod;
  this.feedingAmount = feedingAmount;
  this.feedingMinutes = feedingMinutes;
  this.feedingSeconds = feedingSeconds;
};

exports["default"] = EntryModel;
module.exports = exports["default"];
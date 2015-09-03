'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onPageLoaded = onPageLoaded;
exports.addFeeding = addFeeding;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dataObservable = require('data/observable');

var _dataObservable2 = _interopRequireDefault(_dataObservable);

var _dataObservableArray = require('data/observable-array');

var _dataObservableArray2 = _interopRequireDefault(_dataObservableArray);

// import observable from 'data/observable'
// import observableArray from 'data/observable-array'
//
// import EntryViewModel from './entry-view-model.js'

var pageData = new _dataObservable2['default'].Observable();
var entries = new _dataObservableArray2['default'].ObservableArray([]);
var page;

function timeFormatter(date) {
  return date.getHours() + ':' + date.getMinutes();
}

var EntryViewModel = function EntryViewModel() {
  _classCallCheck(this, EntryViewModel);

  this.startTime = new Date();
  this.formattedStartTime = timeFormatter(this.startTime);
  this.poo = false;
  this.pee = false;
  this.feedingMethod = 0;
  this.feedingAmount = 0;
};

function onPageLoaded(args) {
  page = args.object;
  entries.push(new EntryViewModel());
  entries.push(new EntryViewModel());
  entries.push(new EntryViewModel());
  pageData.set('entries', entries);
  pageData.set('timeFormatter', timeFormatter);

  page.bindingContext = pageData;
}

function addFeeding() {
  entries.push(new EntryViewModel());
}
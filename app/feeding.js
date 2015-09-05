'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onPageLoaded = onPageLoaded;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataObservable = require('data/observable');

var _dataObservable2 = _interopRequireDefault(_dataObservable);

var _dataObservableArray = require('data/observable-array');

var _dataObservableArray2 = _interopRequireDefault(_dataObservableArray);

var _timer = require('timer');

var _timer2 = _interopRequireDefault(_timer);

var _fileSystem = require('file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _momentJs = require('./moment.js');

var _momentJs2 = _interopRequireDefault(_momentJs);

var page, pageData, startTime, timerId;

function calcTimeSinceStart() {
  var now = (0, _momentJs2['default'])(),
      minutes = '' + now.diff(startTime, 'minutes'),
      seconds = '' + now.diff(startTime, 'seconds');

  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }

  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
}

function onPageLoaded(args) {
  page = args.object;
  pageData = new _dataObservable2['default'].Observable();
  startTime = (0, _momentJs2['default'])();

  pageData.set('elapsedTime', calcTimeSinceStart());

  timerId = _timer2['default'].setInterval(function () {
    pageData.set('elapsedTime', calcTimeSinceStart());
  }, 1000);

  page.bindingContext = pageData;
}
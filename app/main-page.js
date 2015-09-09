'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onNavigatedTo = onNavigatedTo;
exports.onPageLoaded = onPageLoaded;
exports.addFeeding = addFeeding;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataObservable = require('data/observable');

var _dataObservable2 = _interopRequireDefault(_dataObservable);

var _dataObservableArray = require('data/observable-array');

var _dataObservableArray2 = _interopRequireDefault(_dataObservableArray);

var _uiFrame = require('ui/frame');

var _uiFrame2 = _interopRequireDefault(_uiFrame);

var _application = require('application');

var _application2 = _interopRequireDefault(_application);

var _fileSystem = require('file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _modelsEntryModelJs = require('./models/entry-model.js');

var _modelsEntryModelJs2 = _interopRequireDefault(_modelsEntryModelJs);

var pageData = new _dataObservable2['default'].Observable();
var entries = new _dataObservableArray2['default'].ObservableArray([]);

var topmost, page;

function onNavigatedTo(args) {
  console.log('Main-page^' + args.object.message);
}

function timeFormatter(value) {
  var hours = value.getHours(),
      minutes = value.getMinutes();

  if (hours.toString().length === 1) {
    hours = '0' + hours;
  }

  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  return hours + ':' + minutes;
}

function boolFormatter(value, trueText) {
  return value ? trueText : '';
}

function feedingMethodFormatter(value) {
  switch (value) {
    case 0:
      return 'Груди(ліві)';
    case 1:
      return 'Груди(праві)';
    case 2:
      return 'Пляшечка';
  }
}

function feedingAmountFormatter(value, method) {
  return method === 0 || method === 1 ? value + 'хв' : value + 'мг';
}

function getEntries() {
  var documents = _fileSystem2['default'].knownFolders.currentApp(),
      entriesFile = documents.getFile('entries.json');

  entriesFile.readText().then(function (content) {
    entries = JSON.parse(content).map(function (entry) {
      return new _modelsEntryModelJs2['default'](entry);
    });

    pageData.set('entries', entries);
  }, function (error) {
    console.log(error);
  });
}

function onPageLoaded(args) {
  page = args.object;
  topmost = _uiFrame2['default'].topmost();

  _application2['default'].resources.timeFormatter = timeFormatter;
  _application2['default'].resources.boolFormatter = boolFormatter;
  _application2['default'].resources.feedingMethodFormatter = feedingMethodFormatter;
  _application2['default'].resources.feedingAmountFormatter = feedingAmountFormatter;

  getEntries();

  pageData.set('entries', entries);

  page.bindingContext = pageData;
}

function addFeeding() {
  topmost.navigate('feeding');
}
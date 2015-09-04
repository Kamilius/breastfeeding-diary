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

var _uiFrame = require('ui/frame');

var _uiFrame2 = _interopRequireDefault(_uiFrame);

var _application = require('application');

var _application2 = _interopRequireDefault(_application);

var pageData = new _dataObservable2['default'].Observable();
var entries = new _dataObservableArray2['default'].ObservableArray([]);

var topmost, page;

function timeFormatter(value) {
  return value.getHours() + ':' + value.getMinutes();
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

var EntryViewModel = function EntryViewModel() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$poo = _ref.poo;
  var poo = _ref$poo === undefined ? false : _ref$poo;
  var _ref$pee = _ref.pee;
  var pee = _ref$pee === undefined ? false : _ref$pee;
  var _ref$feedingMethod = _ref.feedingMethod;
  var feedingMethod = _ref$feedingMethod === undefined ? 0 : _ref$feedingMethod;
  var _ref$feedingAmount = _ref.feedingAmount;
  var feedingAmount = _ref$feedingAmount === undefined ? 0 : _ref$feedingAmount;

  _classCallCheck(this, EntryViewModel);

  this.startTime = new Date();
  this.poo = poo;
  this.pee = pee;
  this.feedingMethod = feedingMethod;
  this.feedingAmount = feedingAmount;
};

function onPageLoaded(args) {
  page = args.object;
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 0, feedingAmount: 10 }));
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 1, feedingAmount: 5 }));
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 2, feedingAmount: 60 }));

  _application2['default'].resources['timeFormatter'] = timeFormatter;
  _application2['default'].resources['boolFormatter'] = boolFormatter;
  _application2['default'].resources['feedingMethodFormatter'] = feedingMethodFormatter;
  _application2['default'].resources['feedingAmountFormatter'] = feedingAmountFormatter;

  pageData.set('entries', entries);

  topmost = _uiFrame2['default'].topmost();

  page.bindingContext = pageData;
}

function addFeeding() {
  // entries.push(new EntryViewModel())
  topmost.navigate('feeding');
}
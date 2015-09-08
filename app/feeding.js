'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.saveEntryToEntriesFile = saveEntryToEntriesFile;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;
exports.navigatedFrom = navigatedFrom;
exports.onPageLoaded = onPageLoaded;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dataObservable = require('data/observable');

var _dataObservable2 = _interopRequireDefault(_dataObservable);

var _dataObservableArray = require('data/observable-array');

var _dataObservableArray2 = _interopRequireDefault(_dataObservableArray);

var _uiFrame = require('ui/frame');

var _uiFrame2 = _interopRequireDefault(_uiFrame);

var _timer = require('timer');

var _timer2 = _interopRequireDefault(_timer);

var _fileSystem = require('file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _application = require('application');

var _application2 = _interopRequireDefault(_application);

var _momentJs = require('./moment.js');

var _momentJs2 = _interopRequireDefault(_momentJs);

var _modelsEntryModelJs = require('./models/entry-model.js');

var _modelsEntryModelJs2 = _interopRequireDefault(_modelsEntryModelJs);

var page,
    pageData,
    timerId = 0,
    entry;

function formatTime(minutes, seconds) {
  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  return minutes + ':' + seconds;
}

function saveEntryState() {
  var documents = _fileSystem2['default'].knownFolders.currentApp(),
      entryFile = documents.getFile('entry.json');

  entryFile.writeText(JSON.stringify(pageData.get('entry'))).then(function (content) {
    console.log(content);
  }, function (error) {
    console.log('saveEntryState(). entryFile write error^' + error);
  });
}

function loadEntryState() {
  var documents = _fileSystem2['default'].knownFolders.currentApp(),
      entryFile = documents.getFile('entry.json');

  entryFile.readText().then(function (content) {
    pageData = new _dataObservable2['default'].Observable(JSON.parse(content));
  }, function (error) {
    console.log('loadEntryState(). entryFile read error^' + error);
  });
}

_application2['default'].on(_application2['default'].suspendEvent, saveEntryState);
_application2['default'].on(_application2['default'].resumeEvent, loadEntryState);

function saveEntryToEntriesFile() {
  debugger;

  var documents = _fileSystem2['default'].knownFolders.currentApp(),
      entriesFile = documents.getFile('entries.json');

  timerId && stopTimer();

  entriesFile.readText().then(function (content) {
    var entries = JSON.parse(content),
        entry = new _modelsEntryModelJs2['default']();

    entry.id = entries[entries.length - 1].id++;
    entry.startTime = pageData.get('startTime');
    entry.poo = pageData.get('poo');
    entry.pee = pageData.get('pee');
    entry.feedingMethod = pageData.get('feedingMethod');
    entry.feedingAmount = Math.round(parseFloat(entry.feedingMinutes + '.' + 60 / 100 * entry.feedingSeconds));
    entry.feedingMinutes = pageData.get('feedingMinutes');
    entry.feedingSeconds = pageData.get('feedingSeconds');

    entries.push(entry);

    entriesFile.writeText(JSON.stringify(entries)).then(function (msg) {
      _uiFrame2['default'].topmost().navigate({
        moduleName: 'main-page',
        context: { message: 'Годування успішно додано' }
      });
    }, function (error) {
      throw new Error('EntryFile write error^' + error);
    });
  }, function (error) {
    throw new Error('EntryFile read error^' + error);
  });
}

function startTimer() {
  timerId = _timer2['default'].setInterval(function () {
    var minutes = pageData.get('feedingMinutes'),
        seconds = pageData.get('feedingSeconds');

    if (seconds < 60) {
      seconds++;
    } else {
      minutes++;
      seconds = 0;
    }

    pageData.set('feedingMinutes', minutes);
    pageData.set('feedingSeconds', seconds);
  }, 1000);
}

function stopTimer() {
  _timer2['default'].clearInterval(timerId);
  timerId = 0;
}

function navigatedFrom() {
  pageData = new _dataObservable2['default'].Observable(new _modelsEntryModelJs2['default']());
}

function onPageLoaded(args) {
  debugger;
  page = args.object;
  pageData = pageData || new _dataObservable2['default'].Observable(new _modelsEntryModelJs2['default']());

  _application2['default'].resources['formatTime'] = formatTime;
  pageData.set('timerId', timerId);

  startTimer();

  page.bindingContext = pageData;
}
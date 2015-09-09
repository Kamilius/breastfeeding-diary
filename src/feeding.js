import observableModule from 'data/observable'
import observableArray from 'data/observable-array'
import frameModule from 'ui/frame'
import actionBarModule from 'ui/action-bar'
import timer from 'timer'
import fs from 'file-system'
import appModule from 'application'
import moment from './moment.js'

import EntryModel from './models/entry-model.js'

var timerId = 0,
    page,
    pageData,
    entry

function formatTime(minutes, seconds) {
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`
  }

  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

function saveEntryState() {
  let documents = fs.knownFolders.currentApp(),
      entryFile = documents.getFile('entry.json'),
      entry = new EntryModel()

  stopTimer()

  entry.startTime = pageData.get('startTime')
  entry.poo = pageData.get('poo')
  entry.pee = pageData.get('pee')
  entry.feedingMethod = pageData.get('feedingMethod')
  entry.feedingMinutes = pageData.get('feedingMinutes')
  entry.feedingSeconds = pageData.get('feedingSeconds')
  entry.suspendTime = moment()

  entryFile.writeText(JSON.stringify(entry))
    .then(function(msg) {
      console.log('Entry. Successfully written.')
    }, function(error) {
      throw new Error(`EntryFile write error^${error}`)
    })
}

function loadEntryState() {
  let documents = fs.knownFolders.currentApp(),
      entryFile = documents.getFile('entry.json')

  entryFile.readText()
    .then(function(content) {
      let entry = JSON.parse(content),
          timediff = moment().diff(moment(entry.suspendTime), 'seconds'),
          minutes = Math.floor(timediff / 60),
          seconds = timediff - minutes * 60

      pageData.set('id', entry.id)
      pageData.set('pee', entry.pee)
      pageData.set('poo', entry.poo)
      pageData.set('feedingMethod', entry.feedingMethod)
      pageData.set('feedingMinutes', entry.feedingMinutes + minutes)
      pageData.set('feedingSeconds', entry.feedingSeconds + seconds)

      //startTimer()
    }, function(error) {
      throw new Error(`EntryFile write error^${error}`)
    })
}

appModule.on(appModule.suspendEvent, saveEntryState)
appModule.on(appModule.resumeEvent, loadEntryState)

export function saveEntryToEntriesFile() {
  let documents = fs.knownFolders.currentApp(),
      entriesFile = documents.getFile('entries.json')

  if (timerId)
    stopTimer()

  entriesFile.readText()
    .then(function(content) {
      let entries = JSON.parse(content),
          entry = new EntryModel()

      entry.id = entries[entries.length - 1].id++
      entry.startTime = pageData.get('startTime')
      entry.poo = pageData.get('poo')
      entry.pee = pageData.get('pee')
      entry.feedingMethod = pageData.get('feedingMethod')
      entry.feedingAmount = Math.round(parseFloat(`${entry.feedingMinutes}.${60 / 100 * entry.feedingSeconds}`))
      entry.feedingMinutes = pageData.get('feedingMinutes')
      entry.feedingSeconds = pageData.get('feedingSeconds')

      entries.push(entry)

      entriesFile.writeText(JSON.stringify(entries))
        .then(function(msg) {
          frameModule.topmost().navigate({
            moduleName: 'main-page',
            context: { message: 'Годування успішно додано' }
          })
        }, function(error) {
          throw new Error(`EntryFile write error^${error}`)
        })
    }, function(error) {
      throw new Error(`EntryFile read error^${error}`)
    })
}

export function startTimer() {
  timerId = timer.setInterval(function() {
    let minutes = pageData.get('feedingMinutes'),
        seconds = pageData.get('feedingSeconds')

    if (seconds < 59) {
      seconds++
    } else {
      minutes++
      seconds = 0
    }

    pageData.set('feedingMinutes', minutes)
    pageData.set('feedingSeconds', seconds)
  }, 1000)
}

export function stopTimer() {
  timer.clearInterval(timerId)
  timerId = 0
}

export function goBack() {
  frameModule.topmost().goBack()
}

export function navigatedFrom() {
  stopTimer()
  pageData = new observableModule.Observable(new EntryModel())
}

export function onPageLoaded(args) {
  page = args.object
  pageData = pageData || new observableModule.Observable(new EntryModel())

  appModule.resources.formatTime = formatTime
  pageData.set('timerId', timerId)

  startTimer()

  page.bindingContext = pageData
}

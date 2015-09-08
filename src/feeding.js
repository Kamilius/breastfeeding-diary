import observableModule from 'data/observable'
import observableArray from 'data/observable-array'
import frameModule from 'ui/frame'
import timer from 'timer'
import fs from 'file-system'
import appModule from 'application'
import moment from './moment.js'

import EntryModel from './models/entry-model.js'

var page,
    pageData,
    timerId = 0,
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
      entryFile = documents.getFile('entry.json')

  entryFile.writeText(JSON.stringify(pageData.get('entry')))
    .then(function(content) {
      console.log(content)
    }, function(error) {
      console.log(`saveEntryState(). entryFile write error^${error}`)
    })
}

function loadEntryState() {
  let documents = fs.knownFolders.currentApp(),
      entryFile = documents.getFile('entry.json')

  entryFile.readText()
    .then(function(content) {
      pageData = new observableModule.Observable(JSON.parse(content))
    }, function(error) {
      console.log(`loadEntryState(). entryFile read error^${error}`)
    })
}

appModule.on(appModule.suspendEvent, saveEntryState)
appModule.on(appModule.resumeEvent, loadEntryState)

export function saveEntryToEntriesFile() {
  debugger

  let documents = fs.knownFolders.currentApp(),
      entriesFile = documents.getFile('entries.json')

  timerId && stopTimer()

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

    if (seconds < 60) {
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

export function navigatedFrom() {
  pageData = new observableModule.Observable(new EntryModel())
}

export function onPageLoaded(args) {
  debugger
  page = args.object
  pageData = pageData || new observableModule.Observable(new EntryModel())

  appModule.resources['formatTime'] = formatTime
  pageData.set('timerId', timerId)

  startTimer()

  page.bindingContext = pageData
}

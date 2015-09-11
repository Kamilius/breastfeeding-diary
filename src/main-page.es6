import observableModule from 'data/observable'
import observableArray from 'data/observable-array'
import frameModule from 'ui/frame'
import appModule from 'application'
import fs from 'file-system'

import EntryModel from './models/entry-model.js'

var pageData = new observableModule.Observable()
var entries = new observableArray.ObservableArray([])

var topmost,
    page

export function onNavigatedTo(args) {
  console.log(`Main-page^${args.object.message}`)
}

function timeFormatter(value) {
  var hours = value.getHours(),
      minutes = value.getMinutes()

  if (hours.toString().length === 1) {
    hours = `0${hours}`
  }

  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`
  }

  return `${hours}:${minutes}`
}

function boolFormatter(value, trueText) {
  return value? trueText : ''
}

function feedingMethodFormatter(value) {
  switch (value) {
    case 0:
      return 'Груди(ліві)'
    case 1:
      return 'Груди(праві)'
    case 2:
      return 'Пляшечка'
  }
}

function feedingAmountFormatter(value, method) {
  return method === 0 || method === 1? `${value}хв` : `${value}мг`
}

function getEntries() {
  let documents = fs.knownFolders.currentApp(),
      entriesFile = documents.getFile('entries.json')

  entriesFile.readText()
    .then(function(content) {
      entries = JSON.parse(content).map(entry => new EntryModel(entry))

      pageData.set('entries', entries)
    }, function(error) {
      console.log(error)
    })
}

export function onPageLoaded(args) {
  page = args.object
  topmost = frameModule.topmost()

  appModule.resources.timeFormatter = timeFormatter
  appModule.resources.boolFormatter = boolFormatter
  appModule.resources.feedingMethodFormatter = feedingMethodFormatter
  appModule.resources.feedingAmountFormatter = feedingAmountFormatter

  getEntries()

  pageData.set('entries', entries)

  page.bindingContext = pageData
}

export function addFeeding() {
  topmost.navigate('feeding')
}

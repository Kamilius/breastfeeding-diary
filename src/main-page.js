import observableModule from 'data/observable'
import observableArray from 'data/observable-array'

// import observable from 'data/observable'
// import observableArray from 'data/observable-array'
//
// import EntryViewModel from './entry-view-model.js'

var pageData = new observableModule.Observable()
var entries = new observableArray.ObservableArray([])
var page

function timeFormatter(date) {
  return `${date.getHours()}:${date.getMinutes()}`
}

function boolFormatter(value, trueText) {
  return value ? trueText : ''
}

function feedingMethodFormatter(value) {
  return value? 'Груди' : 'Пляшечка'
}

class EntryViewModel {
  constructor() {
    this.startTime = new Date()
    this.formattedStartTime = timeFormatter(this.startTime)
    this.poo = false
    this.pee = false
    this.feedingMethod = 0
    this.feedingAmount = 0
  }
}

export function onPageLoaded(args) {
  page = args.object
  entries.push(new EntryViewModel())
  entries.push(new EntryViewModel())
  entries.push(new EntryViewModel())

  pageData.set('entries', entries)
  pageData.set('timeFormatter', timeFormatter)
  pageData.set('boolFormatter', boolFormatter)

  page.bindingContext = pageData
}

export function addFeeding() {
  entries.push(new EntryViewModel())
}

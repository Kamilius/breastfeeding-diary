import observableModule from 'data/observable'
import observableArray from 'data/observable-array'
import appModule from 'application'

var pageData = new observableModule.Observable()
var entries = new observableArray.ObservableArray([])
var page

function timeFormatter(value) {
  return `${value.getHours()}:${value.getMinutes()}`
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

class EntryViewModel {
  constructor({poo = false,
               pee = false,
               feedingMethod = 0,
               feedingAmount = 0} = {}) {
    this.startTime = new Date()
    this.poo = poo
    this.pee = pee
    this.feedingMethod = feedingMethod
    this.feedingAmount = feedingAmount
  }
}

export function onPageLoaded(args) {
  page = args.object
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 0, feedingAmount: 10 }))
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 1, feedingAmount: 5 }))
  entries.push(new EntryViewModel({ poo: true, pee: true, feedingMethod: 2, feedingAmount: 60 }))

  appModule.resources['timeFormatter'] = timeFormatter
  appModule.resources['boolFormatter'] = boolFormatter
  appModule.resources['feedingMethodFormatter'] = feedingMethodFormatter
  appModule.resources['feedingAmountFormatter'] = feedingAmountFormatter

  pageData.set('entries', entries)

  page.bindingContext = pageData
}

export function addFeeding() {
  entries.push(new EntryViewModel())
}

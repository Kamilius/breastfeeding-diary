import observableModule from 'data/observable'
import observableArray from 'data/observable-array'
import timer from 'timer'
import moment from './moment.js'

var page,
    pageData,
    startTime,
    timerId

function calcTimeSinceStart() {
  var now = moment(),
      minutes = `${now.diff(startTime, 'minutes')}`,
      seconds = `${now.diff(startTime, 'seconds')}`

  if (minutes.length === 1) {
    minutes = `0${minutes}`
  }

  if (seconds.length === 1) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

export function onPageLoaded(args) {
  page = args.object
  pageData = new observableModule.Observable()
  startTime = moment()

  pageData.set('elapsedTime', calcTimeSinceStart())

  timerId = timer.setInterval(function() {
    pageData.set('elapsedTime', calcTimeSinceStart())
  }, 1000)

  page.bindingContext = pageData
}

export default class EntryModel {
  constructor({id = 0,
               startTime = new Date(),
               poo = false,
               pee = false,
               feedingMethod = 0,
               feedingAmount = 0,
               feedingMinutes = 0,
               feedingSeconds = 0} = {}) {
    this.id = id
    this.startTime = new Date(startTime)
    this.poo = poo
    this.pee = pee
    this.feedingMethod = feedingMethod
    this.feedingAmount = feedingAmount
    this.feedingMinutes = feedingMinutes
    this.feedingSeconds = feedingSeconds
  }
}

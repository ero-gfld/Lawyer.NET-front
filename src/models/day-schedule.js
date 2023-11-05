export default class DaySchedule {
  lawyerId;
  date;
  availabilities;
  constructor(lawyerId, date, availabilities) {
    this.lawyerId = lawyerId;
    this.date = date;
    this.availabilities = availabilities;
  }
}

import moment from 'moment';

export class DateUtil {
  static initializeDate(date: Date) {
    return moment(date)
      .utcOffset(0)
      .startOf('day')
      .toDate();
  }
}

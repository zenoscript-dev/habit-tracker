import * as moment from 'moment-timezone';
import * as Util from './utilites.util';

export function currentDateTime() {
  return new Date(
    moment().tz('America/New_York').utc().format('YYYY-MM-DD HH:mm:ss'),
  );
}

export function currentDate() {
  return new Date(moment().tz('America/New_York').utc().format('YYYY-MM-DD'));
}

export function currentDateLocaleString() {
  const date = new Date(
    moment().tz('America/New_York').utc().format('YYYY-MM-DD'),
  );
  return moment(date).format('YYYY-MM-DD');
}

export function currentDateTimeString() {
  const date = new Date();
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function currentDateString() {
  const date = new Date();
  return moment(date).format('YYYY-MM-DD');
}

export function convertTo24Hrs(_12hrTime: string) {
  const time = moment(_12hrTime, 'hh:mm A').format('HH:mm');
  return time;
}

export function getFirstAndLastDayOfMonth(year: number, month: number) {
  const date = year + '-' + Util.lpadZero(month.toString(), 2) + '-' + '01';
  var d = moment(date);
  var startMonth = d.clone().startOf('month').format('YYYY-MM-DD');
  var endMonth = d.clone().endOf('month').format('YYYY-MM-DD');
  return { start: startMonth, end: endMonth };
}

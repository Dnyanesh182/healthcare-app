import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {


  getTodayDateRange(date?: any) {
    if (date)
      return [moment(date).toDate(), moment(date).toDate()]
    else
      return [moment().toDate(), moment().toDate()]
  }

  getYesterdayDateRange(date?: any) {
    if (date)
      return [moment(date).subtract(1, 'days').toDate(), moment(date).subtract(1, 'days').toDate()]
    else
      return [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()]
  }

  getLastSevenDaysDateRange(date?: any) {
    if (date)
      return [moment(date).subtract(7, 'days').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(7, 'days').toDate(), moment().toDate()]
  }

  getLastTwoWeekDateRange(date?: any) {
    // Returns the date range for the last two weeks (14 days) including today
    if (date)
      return [moment(date).subtract(13, 'days').toDate(), moment(date).toDate()];
    else
      return [moment().subtract(13, 'days').toDate(), moment().toDate()];
  }

  getLastOneMonthsDateRange(date?: any) {
    if (date)
      return [moment(date).subtract(1, 'months').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(1, 'months').toDate(), moment().toDate()]
  }

  getLastTwoMonthsDateRange(date?: any) {
    if (date)
      return [moment(date).subtract(2, 'months').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(2, 'months').toDate(), moment().toDate()]
  }

  getLastNintyDayDateRange(date?: any) {
    if (date)
      return [moment(date).subtract(89, 'days').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(89, 'days').toDate(), moment().toDate()]
  }

  getLastSixMonths(date?: any) {
    if (date)
      return [moment(date).subtract(6, 'months').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(6, 'months').toDate(), moment().toDate()]
  }

  getLastOneYear(date?: any) {
    if (date)
      return [moment(date).subtract(1, 'years').toDate(), moment(date).toDate()]
    else
      return [moment().subtract(1, 'years').toDate(), moment().toDate()]
  }

  getLastTwoTearDate(date?: any) {
    if (date)
      return moment(date).subtract(2, 'years').toDate()
    else
      return moment().subtract(2, 'years').toDate()
  }

  getDateBySubtractingDays(toDays: number) {
    return moment().subtract(toDays, 'days').toDate()
  }

  getDateBySubtractingMonths(toMonths: number) {
    return moment().subtract(toMonths, 'months').toDate()
  }

  getDefutleDateRangeByMonth(month: number) {
    return [moment().subtract(month, 'months').toDate(), moment().toDate()]
  }
}

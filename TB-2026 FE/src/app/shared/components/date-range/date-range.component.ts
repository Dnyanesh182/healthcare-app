import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { DateRangeService } from '../../services/date-range.service';
import { AppConstants } from '../../../core/constants/app-constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-range',
  imports: [FontAwesomeModule, NgSelectModule, FormsModule, BsDatepickerModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss'
})
export class DateRangeComponent {
  @Input() selectedDateRangeOption: number = 5; // Default to custom date range
  @Input() isEmptyCustomDataRangeAvailable: boolean = false; // Flag to check if custom date range is available
  @Input() isMinDateRestrictionRequired: boolean = true; // Flag to check if min date restriction is required
  @Input() maxDate: any; // Max date for the date range selection
  @Input() disabledDateRangOptionDropDown: boolean = false; // Flag to disable the date range option dropdown
  @Input() minRestrictionDays: number = 0; // Minimum restriction in days for date selection
  @Input() minRestrictionMonths: number = 0; // Minimum restriction in months for date selection
  @Input() skipMinDateSelection: boolean = false; // Flag to skip min date selection
  @Input() defualtMonthRangeForCustomOption: number = 0 ; // Default month range for custom option
  @Output() dateRangeEmitter: EventEmitter<any> = new EventEmitter(); // Emits the selected date range
  @Output() updateDateRangeOnlyEmitter: EventEmitter<any> = new EventEmitter(); // Emits the date range without closing the date picker
  @Output() dateRangeMaxLimitMessageShowEmitter: EventEmitter<boolean> = new EventEmitter(); // Emits the flag to show/hide the max limit message

  public minDate!: Date;
  public dateRangeList: any = [];
  public selectedDateRange: any;
  public fa = { faCalendarAlt };
  public bsInlineRangeValue: Date[] = [];

  constructor(
    private dateRangeService: DateRangeService
  ) { }

  ngOnInit(): void {
    this.maxDate = this.getMaxDate(this.maxDate);
    this.minDate = this.getMinDate();

    this.dateRangeList = AppConstants.DATE_RANGE;
    this.setSelectedDateRangeByOption(this.selectedDateRangeOption);
  }

  /**
   * @param date The date string to be converted to a Date object.
   * @returns The converted Date object or the current date if the input is invalid.
   */
  private getMaxDate(date: any): Date {
    if (date && date?.toLocaleLowerCase() !== AppConstants.NOT_AVAILABLE) {
      return new Date(date.replace(AppConstants.SPACE_WITH_CST, ""));
    }
    return new Date();
  }

  /**
   * @returns The minimum date based on the provided restrictions or a default date.
   */
  private getMinDate(): Date {
    if (this.skipMinDateSelection) return undefined as any;
    if (this.minRestrictionDays > 0) {
      return this.isMinDateRestrictionRequired
        ? this.dateRangeService.getDateBySubtractingDays(this.minRestrictionDays)
        : new Date("00/00/0001");
    }
    if (this.minRestrictionMonths > 0) {
      return this.isMinDateRestrictionRequired
        ? this.dateRangeService.getDateBySubtractingMonths(this.minRestrictionMonths)
        : new Date("00/00/0001");
    }
    return this.isMinDateRestrictionRequired
      ? this.dateRangeService.getLastTwoTearDate()
      : new Date("00/00/0001");
  }

  //Method for setting the date range by the selection
  public setSelectedDateRangeByOption(type: number) {

    switch (type) {
      case 1: // Today
        this.selectedDateRange = this.dateRangeService.getTodayDateRange(this.maxDate);
        break;
      case 2: // Yesterday
        this.selectedDateRange = this.dateRangeService.getYesterdayDateRange(this.maxDate);
        break;
      case 3: // Last 7 Days
        this.selectedDateRange = this.dateRangeService.getLastSevenDaysDateRange(this.maxDate);
        break;
      case 4: // Last 30 Days
        this.selectedDateRange = this.dateRangeService.getLastOneMonthsDateRange(this.maxDate);
        break;
      case 5: // Custom Date Range
      if (this.isEmptyCustomDataRangeAvailable) {
        this.selectedDateRange = null;
      } else if (this.defualtMonthRangeForCustomOption > 0) {
        this.selectedDateRange = this.dateRangeService.getDefutleDateRangeByMonth(
          this.defualtMonthRangeForCustomOption
        );
      } else {
        this.selectedDateRange = this.dateRangeService.getTodayDateRange(this.maxDate);
      }
    
      this.updateDateRangeOnlyEmitter.emit(this.selectedDateRange);
      break;
    }
    this.bsInlineRangeValue = this.selectedDateRange
      ? [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]
      : [this.setDateWithoutTime(this.minDate), this.setDateWithoutTime(this.maxDate)];
  }

  //Method is getting executed when date range is changing and emit the date range to the parent component
  public dateRangeOptionChange() {
    this.setSelectedDateRangeByOption(this.selectedDateRangeOption);
    if (this.selectedDateRangeOption !== 5) {
      this.dateRangeEmitter.emit(this.selectedDateRange);
      this.dateRangeMaxLimitMessageShowEmitter.emit(false);
    } else {
      this.dateRangeEmitter.emit(this.selectedDateRange);
      this.dateRangeMaxLimitMessageShowEmitter.emit(true);
    }
  }

  //Method for validate the date input and emit the date range to the parent component
  public dateRangeChange() {
    if (this.selectedDateRangeOption === 5) {
      let isInvalidDate = false;
      if ((!this.selectedDateRange || this.selectedDateRange?.length !== 2) // mark it as invalid if date range is missing
        || (this.selectedDateRange?.length === 2 && (!this.selectedDateRange[0] || !this.selectedDateRange[1])) // mark it as invalid if from or to range is missing
        || (this.setDateWithoutTime(this.selectedDateRange[0]) < this.setDateWithoutTime(this.minDate) || this.setDateWithoutTime(this.selectedDateRange[1]) > this.setDateWithoutTime(this.maxDate)) // mark it as invalid if from is less then min date and to date is greater than the max date) 
        || (this.selectedDateRange[0] > this.selectedDateRange[1])) // mark it as invalid if the min date is greater than the max date
      {
        isInvalidDate = true;
      }

      if (!isInvalidDate) { //if invalid date, reset to the defalut date selection
        this.dateRangeEmitter.emit(this.selectedDateRange);
      } else {
        this.selectedDateRange = this.selectedDateRange = this.isEmptyCustomDataRangeAvailable ? null : this.dateRangeService.getTodayDateRange(this.maxDate);
        this.updateDateRangeOnlyEmitter.emit(this.selectedDateRange);
      }
    }
  }

  //Method for setting the time as zero
  private setDateWithoutTime(date: any) {
    let dateObj = date.setHours(0, 0, 0, 0);
    return new Date(dateObj);
  }

  //Method for open/close the date picker on click of input calender icon
  public dateToggling(el: any) {
    if (this.selectedDateRangeOption === 5) {
      el.toggle();
    }
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppConstants } from '../../../core/constants/app-constants';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-select-drop-down',
  imports: [NgSelectModule, FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './multi-select-drop-down.component.html',
  styleUrl: './multi-select-drop-down.component.scss'
})
export class MultiSelectDropDownComponent {
  @Output() selectedData = new EventEmitter<any>(); // Emits selected data
  @Output() onClose = new EventEmitter<any>(); // Emits event on dropdown close
  public fa = { faSearch, faCircle }; // FontAwesome icons for search and circle
  @Input() data: any = []; // Input data for dropdown options
  @Input() placeHolder: string = ''; // Placeholder text for dropdown
  @Input() cssClass: string = ''; // Custom CSS class for dropdown
  @Input() bindValue: string = ''; // Key to bind value for options
  @Input() bindLabel: string = ''; // Key to bind label for options
  @Input() formControlElement: string = ''; // Form control element for binding
  @Input() appendToId: string = ''; // ID to append dropdown
  @Input() selectedText: string = 'Selected Items'; // Text for selected items
  @Input() selectedItems: any = []; // Pre-selected items
  @Input() isDisabled: boolean = false; // Flag to disable dropdown
  @Input() showSelectAll: boolean = true; // Flag to show select-all option
  @Input() columnHeder: string = ''; // Column header for dropdown
  @Input() columnValue: string = ''; // Column value for dropdown
  @Input() scssClass: string = 'multiple-select-dropdown'; // Default CSS class
  @Input() isAppendBody: boolean = false; // Flag to append dropdown to body
  public fliteredData: any = []; // Filtered data for dropdown
  public searchText: string = ''; // Search text for filtering
  public selectedValues: any = []; // Selected values from dropdown
  public firstSelectedData: any = []; // First selected item
  public selectAll: boolean = false; // Flag for select-all state
  public isSelectAllClicked: boolean = false; // Flag for select-all click state
  public isOpen: boolean = false; // Flag for dropdown open state
  public tooltipData: string = ''; // Tooltip data for selected items
  public noneSelectedText: string = AppConstants.NONE_SELECTED; // Text for no selection


  /**
   * Initializes the component.
   * - Sets up filtered data and selected values.
   * - Handles select-all state based on pre-selected items.
   */
  ngOnInit(): void {
    this.fliteredData = this.data;
    this.selectedValues = this.selectedItems;
    if (this.selectedValues.length) {
      if (this.fliteredData?.length == this.selectedValues?.length) {
        this.selectAll = true;
        this.isSelectAllClicked = true;
      } else {
        this.sendSelectedData();
      }
    }
  }

  /**
   * Handles changes to input properties.
   * - Updates filtered data and selected values.
   * - Manages tooltip and select-all state.
   */
  ngOnChanges(): void {
    this.fliteredData = this.data;
    this.selectedValues = this.selectedItems;
    this.tooltipData = '';
    this.isSelectAllClicked = false;
    this.selectAll = false;
    this.searchText = '';
    if (this.selectedValues?.length) {
      if (this.fliteredData?.length == this.selectedValues?.length) {
        this.selectAll = true;
        this.isSelectAllClicked = true;
        this.selectAllData();
      } else {
        this.sendSelectedData();
      }
    }
  }

  /**
   * Filters dropdown data based on search text.
   * - Updates filtered data and select-all state.
   * @param value The search text.
   */
  public filterSelectedData(value: string) {
    this.fliteredData = this.data?.filter((item: any) => {
      if (item.text.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
    });

    if (this.fliteredData?.length != this.selectedValues.length) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
    }
    if (this.fliteredData?.length == 0) {
      this.selectAll = false;
    }
    if (this.isSelectAllClicked) {
      this.selectedValues = this.data?.map((item: any) => item.value);
      this.selectAll = true;
    }
  }

  /**
   * Clears the search input and resets filtered data.
   */
  public clearInput() {
    this.searchText = '';
    this.fliteredData = this.data;
    if (this.fliteredData?.length != this.selectedValues.length) {
      this.selectAll = false;
    } else {
      this.selectAll = true;
      this.isSelectAllClicked = true;
    }
  }

  /**
   * Toggles select-all state and updates selected values.
   */
  public selectAllData() {
    if (this.selectAll) {
      this.selectedValues = this.fliteredData?.map((item: any) => item.value);
      this.isSelectAllClicked = !this.searchText;
      this.isOpen = !this.isOpen;
    } else {
      this.selectedValues = [];
      this.isOpen = !this.isOpen;
      this.isSelectAllClicked = false;
    }
    this.updateTooltipData();
    this.sendSelectedData();
  }

  /**
   * Updates tooltip data based on selected values.
   */
  private updateTooltipData() {
    const tooltipArray: string[] = [];

    for (const item of this.data ?? []) {
      for (const selected of this.selectedValues) {
        if (item[this.bindValue] === selected) {
          tooltipArray.push(item[this.bindLabel]);
        }
      }
    }

    this.tooltipData = tooltipArray.join(', ');
  }

  get _bindLabel(): string {
    return this.bindLabel;
  }

  get _bindValue(): string {
    return this.bindValue;
  }

  /**
   * Emits selected data and updates select-all state.
   */
  public sendSelectedData() {
    if (this.selectedValues.length == 1) {
      this.firstSelectedData = this.fliteredData?.filter((item: any) => {
        if (item.value === this.selectedValues[0]) {
          return item.text;
        }
      });
    }

    // Update selectAll and isSelectAllClicked based on complete data set
    const allSelected = this.selectedValues?.length === this.data?.length;
    this.selectAll = allSelected;
    this.isSelectAllClicked = allSelected;

    this.updateTooltipData();
    this.selectedData.emit(this.selectedValues);
  }

  /**
   * Handles dropdown close event and updates select-all state.
   */
  public onDropdownClose() {
    const allSelected = this.selectedValues?.length === this.fliteredData?.length;
    this.selectAll = allSelected;
    this.isSelectAllClicked = allSelected;
    this.onClose.emit(this.selectedValues);
  }
}

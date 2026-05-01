import {
  Component,
  Input,
  forwardRef,
  HostListener,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { UserGridComponent } from '../../../user/components/user-grid/user-grid.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-select-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GenericSelectDropdownComponent),
    multi: true
  }],
  templateUrl: './generic-select-dropdown.component.html',
  styleUrl: './generic-select-dropdown.component.scss'
})
export class GenericSelectDropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() options: any[] = [];
  @Input() displayKey: string = '';
  @Input() valueKey: string = '';
  @Input() placeholder: string = 'Select Organisation';

  value: any;
  selectedItem: any = null;
  isDropdownOpen = false;

  constructor(private userGridComponent: UserGridComponent) { }

  onChange = (_: any) => { };
  onTouched = () => { };

  public writeValue(obj: any): void {
    this.value = obj;
    if (this.options?.length) {
      this.selectedItem = this.options.find(opt => opt[this.valueKey] === obj) || null;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectItem(item: any, event: Event): void {
    event.stopPropagation();
    this.selectedItem = item;
    this.value = item[this.valueKey];
    this.isDropdownOpen = false;
    this.onChange(this.value);
    this.userGridComponent.getUsers(this.value);
  }

  @HostListener('document:click', ['$event'])
  public closeDropdown(event: any): void {
    if (!event.target.closest('.custom-dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.value) {
      this.selectedItem = this.options.find(opt => opt[this.valueKey] === this.value) || null;
    }
  }
}

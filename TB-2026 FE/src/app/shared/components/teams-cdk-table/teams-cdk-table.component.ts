import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { faSort, faSortUp, faSortDown, faTimes, faTrash, faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OverflowTooltipComponent } from '../overflow-tooltip/overflow-tooltip.component';

@Component({
  selector: 'app-teams-cdk-table',
  standalone: true,
  imports: [CommonModule,
    CdkTableModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    OverflowTooltipComponent],
  templateUrl: './teams-cdk-table.component.html',
  styleUrl: './teams-cdk-table.component.scss'
})
export class TeamsCdkTableComponent {
  @Input() columnDefs: { key: string; header: string }[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions: string[] = [];

  @Input() displayedColumns: string[] = [];
  @Input() sortColumn!: () => string;
  @Input() sortDirection!: () => 'asc' | 'desc';
  @Input() sortBy!: (column: string) => void;
  @Input() filterControls: { [key: string]: FormControl } = {};

  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();
  public headerFilterColumns: string[] = [];
  public headerLabelColumns: string[] = [...this.displayedColumns];
  public dataColumns: string[] = [];
  public fa = {
    faSort: faSort,
    faSortUp: faSortUp,
    faSortDown: faSortDown
  };

  public getIconForAction(action: string): IconDefinition {
    switch (action) {
      case 'edit':
        return faEdit;
      case 'remove':
        return faTrash;
      default:
        return faEdit;
    }
  }
  sort = { active: '', direction: 'asc' };
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faTimes = faTimes;

  get allHeaderColumns(): string[] {
    return this.displayedColumns.map(col => col + 'Label').concat(this.actions.length ? ['action'] : []);
  }

  get allDataColumns(): string[] {
    return [...this.displayedColumns, ...(this.actions.length ? ['action'] : [])];
  }

  ngOnInit(): void {
    this.headerFilterColumns = this.displayedColumns.map(col => col + 'Filter');
    this.headerLabelColumns = [...this.displayedColumns];
    this.dataColumns = [...this.displayedColumns];

    if (this.actions?.length){
      this.headerLabelColumns.push('action');
      this.headerFilterColumns.push('actionFilter');
      this.dataColumns.push('action');
    }
  }

  public getColumnHeader(key: string): string {
    return this.columnDefs.find(col => col.key === key)?.header ?? key;
  }

  public onAction(action: string, row: any): void {
    this.actionClicked.emit({ action, row });
  }
}

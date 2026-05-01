import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { faSort, faSortUp, faSortDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OverflowTooltipComponent } from '../overflow-tooltip/overflow-tooltip.component';

@Component({
  selector: 'app-cdk-table',
  standalone: true,
  imports: [CommonModule, CdkTableModule, FontAwesomeModule, TooltipModule, ReactiveFormsModule, OverflowTooltipComponent],
  templateUrl: './cdk-table.component.html',
  styleUrl: './cdk-table.component.scss'
})
export class CdkTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions: string[] = [];
  @Input() sortColumn!: () => string;
  @Input() sortDirection!: () => 'asc' | 'desc';
  @Input() sortBy!: (column: string) => void;
  @Input() filterControls: { [key: string]: FormControl } = {};
  @Input() colConfig: any[] = [];

  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();

  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faTimes = faTimes;
  headerLabelColumns: string[] = [];
  headerFilterColumns: string[] = [];

  public onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  ngOnInit(): void {
    this.headerLabelColumns = [...this.displayedColumns];
    this.headerFilterColumns = this.displayedColumns.map(col => col + 'Filter');

    if (this.actions?.length) {
      this.headerLabelColumns.push('action');
      this.headerFilterColumns.push('actionFilter');
    }
  }

  get colConfigMap() {
    return this.colConfig.reduce((acc, col) => {
      acc[col.field] = col;
      return acc;
    }, {} as { [key: string]: any });
  }

}

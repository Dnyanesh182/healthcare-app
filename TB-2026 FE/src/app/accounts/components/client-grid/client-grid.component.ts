import { Component, OnInit, signal } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faChevronLeft, faChevronRight, faSort, faSortDown, faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OverflowTooltipComponent } from '../../../shared/components/overflow-tooltip/overflow-tooltip.component';
import { CommonService } from '../../../shared/services/common.service';
import { AccountApiService } from '../../services/account-api.service';
import { AppConstants } from '../../../core/constants/app-constants';
import { USER_IMPORTS } from '../../../user.config';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-client-grid',
  standalone: true,
  imports: [USER_IMPORTS, TooltipModule, PaginationModule, OverflowTooltipComponent],
  templateUrl: './client-grid.component.html',
  styleUrl: './client-grid.component.scss'
})
export class ClientGridComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'city',
    'state',
    'isActive',
    'totalUsers',
    'actions'
  ];
  headerLabels = ['nameLabel', 'emailLabel', 'cityLabel', 'stateLabel', 'isActiveLabel', 'totalUsersLabel', 'actionsLabel'];
  headerFilters = ['nameFilter', 'emailFilter', 'cityFilter', 'stateFilter', 'isActiveFilter', 'totalUsersFilter', 'actionsFilter'];
  paginatedData: any[] = [];

  public rowData: any[] = [];
  public columnDefs: any[] = [];
  public paginationPageSize: number = 20;
  public showAddAccount!: boolean;
  public selectedAccount: any = null;
  public showUserList: boolean = false;
  public sortColumn = signal('');
  public sortDirection = signal<'asc' | 'desc'>('asc');
  public pageIndex = signal(AppConstants.DEFAULT_PAGE_INDEX);
  public pageSize: number = AppConstants.DEFAULT_PAGE_SIZE;
  public pageSizeOptions = AppConstants.PAGE_SIZE_OPTIONS;
  private totalPages = 1;
  public fa = { faArrowDown, faArrowUp, faSort, faSortDown, faSortUp, faTimes, faChevronLeft, faChevronRight };
  public filterControls: { [key: string]: FormControl } = {
    name: new FormControl(''),
    email: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    timeZone: new FormControl(''),
    status: new FormControl(null),
    totalUsers: new FormControl(''),
  };
  public timeZoneOptions: { label: string, value: string }[] = [];
  public pageNumberControl = new FormControl(AppConstants.DEFAULT_PAGE_NUMBER);
  public filteredRowCount = 0;

  // ── Add Account form ──────────────────────────────────────────────────────
  public createAccountForm!: FormGroup;
  public createFormErrors: any = {};
  public isSavingAccount = false;

  constructor(
    public bsModalService: BsModalService,
    public router: Router,
    private commonService: CommonService,
    private accountApiService: AccountApiService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initCreateForm();
    this.getUsers();
  }

  ngOnInit(): void {
    this.pageNumberControl.valueChanges.subscribe((page: any) => {
      const newIndex = Math.max(0, (page || 1) - 1);
      this.pageIndex.set(newIndex);
      this.updatePaginatedData();
    });
    Object.values(this.filterControls).forEach(control => {
      control.valueChanges.subscribe(() => {
        this.pageIndex.set(0);
        this.pageNumberControl.setValue(1, { emitEvent: false });
        this.updatePaginatedData();
      });
    });
  }

  // ── Add Account helpers ───────────────────────────────────────────────────

  private initCreateForm(): void {
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;

    this.createAccountForm = this.fb.group({
      accountName:  ['', [Validators.required, Validators.pattern(namePattern)]],
      accountEmail: ['', [Validators.required, Validators.pattern(emailPattern)]],
      address1:     [''],
      address2:     [''],
      city:         ['', Validators.pattern(namePattern)],
      state:        ['', Validators.pattern(namePattern)],
      zipCode:      ['', Validators.pattern(/^\d*$/)],
    });

    this.createFormErrors = {
      accountName: '',
      accountEmail: '',
      city: '',
      state: '',
      zipCode: ''
    };

    this.createAccountForm.valueChanges.subscribe(() => this.validateCreateForm());
  }

  private validateCreateForm(): void {
    const messages: any = {
      accountName:  { required: 'Account name is required.', pattern: 'Only letters are allowed.' },
      accountEmail: { required: 'Email is required.', pattern: 'Please enter a valid email address.' },
      city:         { pattern: 'Only letters are allowed.' },
      state:        { pattern: 'Only letters are allowed.' },
      zipCode:      { pattern: 'Only numeric values are allowed.' }
    };

    Object.keys(this.createFormErrors).forEach(key => {
      this.createFormErrors[key] = '';
      const ctrl = this.createAccountForm.get(key);
      if (ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched)) {
        const errors = ctrl.errors || {};
        const msg = messages[key] || {};
        this.createFormErrors[key] = Object.keys(errors).map(e => msg[e] || '').filter(Boolean).join(' ');
      }
    });
  }

  public submitNewAccount(): void {
    // Mark all controls dirty to trigger validation display
    Object.keys(this.createAccountForm.controls).forEach(key =>
      this.createAccountForm.get(key)?.markAsDirty()
    );
    this.validateCreateForm();

    if (this.createAccountForm.invalid) {
      return;
    }

    this.isSavingAccount = true;
    const payload = this.createAccountForm.value;

    this.accountApiService.createAccount(payload).subscribe({
      next: () => {
        this.isSavingAccount = false;
        this.notificationService.success('Account created successfully.');
        this.showAddAccount = false;
        this.createAccountForm.reset();
        this.getUsers();
      },
      error: () => {
        this.isSavingAccount = false;
        this.notificationService.error('Failed to create account. Please try again.');
      }
    });
  }

  // ── Grid helpers ─────────────────────────────────────────────────────────

  async onStatusToggle(event: Event, client: any): Promise<void> {
    const input = event.target as HTMLInputElement;
    const newStatus = input.checked;
    const isActivating = newStatus;

    // Revert the checkbox immediately — let the server response drive the final state
    input.checked = !newStatus;

    this.commonService.showConfirmationModal({
      title: `Confirm ${isActivating ? 'Activation' : 'Deactivation'}`,
      message: `Are you sure you want to ${isActivating ? 'activate' : 'deactivate'} ${client.name}?`,
      onConfirm: () => {
        this.accountApiService.updateAccountStatus({
          accountId: client.id,
          clientName: client.name,
          isActive: newStatus
        }).subscribe({
          next: (res: any) => {
            if (res?.success) {
              // Re-fetch the full list from the server so the grid (filters,
              // sort, edit-icon isActive state) always reflects the real state.
              this.getUsers();
            }
            // If not successful, checkbox stays reverted (already done above)
          },
          error: () => {
            // On error, checkbox stays reverted — no further action needed
          }
        });
      },
      onCancel: () => {
        // Already reverted above — nothing else to do
      }
    });
  }

  public getUsers() {
    const filterPayload = {
      PageNumber: 1,
      PageSize: 100,
      AccountName: '',
      Email: '',
      Status: null,
      City: '',
      State: ''
    };
    this.accountApiService.getAllAccounts(filterPayload).subscribe({
      next: (response: any) => {
        const accounts = response?.data || response;
        if (accounts && accounts.length > 0) {
          this.rowData = accounts.map((account: any) => ({
            id: account.accountId,
            name: account.accountName,
            email: account.accountEmail,
            isActive: account.isActive,
            status: account.isActive ? 'Active' : 'Inactive',
            city: account.city,
            state: account.state,
            timeZoneInfo: account.timeZoneInfo,
            totalUsers: account.totalUsers,
            accountLogoUrl: account.accountLogoUrl
          }));
          this.pageIndex.set(0);
          this.pageNumberControl.setValue(1, { emitEvent: false });
          this.updatePaginatedData();
        } else {
          this.rowData = [];
          this.paginatedData = [];
        }
      },
      error: () => {
        this.rowData = [];
        this.paginatedData = [];
      }
    });
  }

  public backToList() {
    this.selectedAccount = null;
    this.showAddAccount = false;
    this.createAccountForm.reset();
    Object.keys(this.createFormErrors).forEach(k => (this.createFormErrors[k] = ''));
    this.getUsers();
  }

  public editAccount(acc: any) {
    this.selectedAccount = acc;
    this.showAddAccount = true;
  }

  public addAccount() {
    this.selectedAccount = null;
    this.createAccountForm.reset();
    Object.keys(this.createFormErrors).forEach(k => (this.createFormErrors[k] = ''));
    this.showAddAccount = true;
  }

  public toggleAddClientForm() {
    this.selectedAccount = null;
    this.showAddAccount = !this.showAddAccount;
  }

  public accountDetails(account: any) {
    this.router.navigate(['/accountDetails', account.id]);
  }

  public sortBy(column: string) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.updatePaginatedData();
  }

  public updatePaginatedData() {
    const filtered = this.rowData.filter(item => this.matchesAllFilters(item));

    const sortCol = this.sortColumn();
    if (sortCol) {
      const sortDir = this.sortDirection();
      filtered.sort((a, b) => this.compareGridValues(a, b, sortCol, sortDir));
    }

    this.filteredRowCount = filtered.length;
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const newIndex = Math.min(this.pageIndex(), Math.max(this.totalPages - 1, 0));
    this.pageIndex.set(newIndex);

    const start = newIndex * this.pageSize;
    this.paginatedData = filtered.slice(start, start + this.pageSize);
  }

  private matchesAllFilters(item: any): boolean {
    return Object.entries(this.filterControls).every(([key, ctrl]) => {
      const value = ctrl.value?.toString().toLowerCase();
      if (!value) return true;
      if (key === 'status') return item.status?.toLowerCase() === value;
      if (key === 'timeZone') return item.timeZoneInfo?.fullName?.toLowerCase() === value;
      return item[key]?.toString().toLowerCase().includes(value);
    });
  }

  private compareGridValues(a: any, b: any, sortCol: string, sortDir: 'asc' | 'desc'): number {
    const valA: any = a[sortCol] ?? '';
    const valB: any = b[sortCol] ?? '';

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortDir === 'asc'
        ? valA.localeCompare(valB, undefined, { sensitivity: 'base' })
        : valB.localeCompare(valA, undefined, { sensitivity: 'base' });
    }

    let result = 0;
    if (valA < valB) result = -1;
    else if (valA > valB) result = 1;
    return sortDir === 'asc' ? result : -result;
  }

  public nextPage() {
    if (this.pageIndex() < this.totalPages - 1) {
      this.pageIndex.set(this.pageIndex() + 1);
      this.updatePaginatedData();
    }
  }

  public prevPage() {
    if (this.pageIndex() > 0) {
      this.pageIndex.set(this.pageIndex() - 1);
      this.updatePaginatedData();
    }
  }

  public onPageSizeChange(newSize: number) {
    this.pageSize = +newSize;
    this.pageIndex.set(0);
    this.updatePaginatedData();
  }
}

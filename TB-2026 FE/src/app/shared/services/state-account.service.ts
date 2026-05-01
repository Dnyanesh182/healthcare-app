import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { USER_ROLES } from '../../core/constants/constants';
import { Router } from '@angular/router';
import { APP_ROUTES_PATH_CONST } from '../../core/constants/app-routing-contants';
import { Account } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class StateAccountService {

  constructor(
    public router: Router,
  ){
  }

  private selectedAccountSubject = new BehaviorSubject<Account | null>(null);
  selectedAccount$ = this.selectedAccountSubject.asObservable();

  setAccountValue(value: Account) {
    const resumeFormatteReportrAccess = value?.accountChecks?.some((e: any) => e.key == 'resumeFormatter' && !e.isDeleted);

    this.selectedAccountSubject.next(value);
  }

  getAccountValue(): Account | null {
    return this.selectedAccountSubject.value;
  }

  clearState() {
    this.selectedAccountSubject.next(null);
  }
}

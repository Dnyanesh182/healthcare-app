import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }
  public createAccount(payload: any) {
    return this.http.post('api/Account/create', payload);
  }

  public updateAccountChecks(payload: any, accountId: any) {
    return this.http.post('api/Account/checks', payload, { params: { accountId: accountId } });
  }

  public updateAccountInfo(payload: any, accountId: any) {
    return this.http.put(`api/Account/${accountId}/info`, payload);
  }

  public getScrappingConfig(payload: any) {
    return this.http.post('api/Account/scraping-config', payload);
  }

  public updateAccountStatus(data: any) {
    return this.http.put('api/Account/status', data);
  }

  public getAllAccounts(filterPayload: any) {
    return this.http.post('api/Account/list', filterPayload);
  }

  public getAccountById(accountId: any) {
    return this.http.get(`api/Account/${accountId}`);
  }

  public updateSharepointConfiguration(data: any) {
    return this.http.put('api/Account/sharepoint', data);
  }

  public addSharepointConfiguration(data: any) {
    return this.http.put('api/Account/sharepoint', data);
  }

  public getLookup() {
    return this.http.get('api/Account/lookups');
  }

  public getAllTimeZones() {
    return this.http.get('api/Account/timezones');
  }
  public getAllUsers(userlistPayload: any) {
    return this.http.post('api/Account/users', userlistPayload);
  }
}

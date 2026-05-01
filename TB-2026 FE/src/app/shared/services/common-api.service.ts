import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  constructor(
    private http: HttpClient,
  ) { }

  public getUserById(userId: any): Observable<any> {

    const params = new HttpParams().set('userId', (userId));

    return this.http.get('GetUserByID', { params });
  }

  getAllClient(): Observable<any> {
    return this.http.get('GetAllClient');
  }

  uploadPhotoToBlob(data: any): Observable<any> {
    return this.http.post('UploadPhotoToBlob', data);
  }

  removePhoto(data: any): Observable<any> {
    return this.http.post('RemovePhoto', data);
  }

  getAllAccounts(userlistPayload: any): Observable<any> {
    return this.http.post('GetAllAccounts', userlistPayload);
  }

  addUser(data: any): Observable<any> {
    return this.http.post('CreateUser', data);
  }

  public getAccountByUser(payload: any) {
    return this.http.get('GetAccountsByUserid', { params: payload })
  }
}

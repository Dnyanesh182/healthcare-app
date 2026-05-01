import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlobDownloadService {
  private accountName = environment.accountName;
  private accountKey =  environment.accountKey;
  private msAuthVersion = '2019-02-02';

  constructor(private http: HttpClient) {}

  private generateSignature(canonicalizedString: string): string {
    const key = CryptoJS.enc.Base64.parse(this.accountKey);
    const message = CryptoJS.enc.Utf8.parse(canonicalizedString);
    const signature = CryptoJS.HmacSHA256(message, key);
    return CryptoJS.enc.Base64.stringify(signature);
  }

  private generateUrl(container: string, blobPath: string): string {
    return `https://${this.accountName}.blob.core.windows.net/${container}/${blobPath}`;
  }

  private getHeaders(container: string, blobPath: string): HttpHeaders {
    const utcDate = new Date().toUTCString();

    const canonicalizedResource = `/${this.accountName}/${container}/${blobPath}`;
    const canonicalizedString =
      `GET\n\n\n\nx-ms-date:${utcDate}\nx-ms-version:${this.msAuthVersion}\n${canonicalizedResource}`;

    const signature = this.generateSignature(canonicalizedString);

    return new HttpHeaders({
      Authorization: `SharedKeyLite ${this.accountName}:${signature}`,
      'x-ms-date': utcDate,
      'x-ms-version': this.msAuthVersion,
    });
  }

  downloadFile(blobUrl: string): void {
    const parts = new URL(blobUrl).pathname.split('/').filter(Boolean);
    const fileName = parts.pop()!;
    const container = parts.join('/');

    const headers = this.getHeaders(container, fileName);
    const url = this.generateUrl(container, fileName);

    this.http.get(url, { headers, responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

    getBlobImageUrl(blobUrl: string): Observable<string> {
    const parts = new URL(blobUrl).pathname.split('/').filter(Boolean);
    const fileName = parts.pop()!;
    const container = parts.join('/');

    const headers = this.getHeaders(container, fileName);
    const url = this.generateUrl(container, fileName);

    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  public success(message: string): void {
    this.toastr.success(message, '', {
      timeOut: 3000,
      closeButton: true
    });
  }

  public error(message: string): void {
    this.toastr.error(message, '', {
      timeOut: 3000,
      closeButton: true
    });
  }

  public info(message: string): void {
    this.toastr.info(message, '', {
      timeOut: 3000,
      closeButton: true
    });
  }

  public warning(message: string): void {
    this.toastr.warning(message, '', {
      timeOut: 3000,
      closeButton: true
    });
  }
}

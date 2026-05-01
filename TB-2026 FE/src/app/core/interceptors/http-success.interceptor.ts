import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { ApiConstants } from '../constants/api-constants';

export const httpSuccessInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const notificationService = inject(NotificationService);
  const apiToShowSuccessToastr = ApiConstants.API_TO_SHOW_SUCCESS_TOASTR;
  // Check if the request URL matches any API in the list
  const shouldShowToastr = apiToShowSuccessToastr.some(api =>
    request.url.toLocaleLowerCase().includes(api.toLocaleLowerCase())
  );
  return next(request).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse && shouldShowToastr) {
          const { success, message } = response.body || {};
          if (success && message) {
            notificationService.success(message);
          } else if (message) {
            notificationService.error(message);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = error.error?.errorMessage || 'An unexpected error occurred';
        // Display error toastr
        notificationService.error(errorMessage);
      }
    })
  );
};

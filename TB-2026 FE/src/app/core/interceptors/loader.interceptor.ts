import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { finalize } from "rxjs";

let count = 0;

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const loaderService = inject(LoaderService);

  if (request.headers.has('X-Hide-Spinner') || request.headers.has('hideLoader')) {
    return next(request);
  }

  count++;
  if (count === 1) {
    loaderService.show();
  }

  return next(request).pipe(
    finalize(() => {
      count--;
      if (count === 0) {
        loaderService.hide();
      }
    })
  );
};

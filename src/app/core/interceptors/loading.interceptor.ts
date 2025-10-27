import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";
import { inject } from "@angular/core";

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
  const loadingService = inject(LoadingService);

  loadingService.showLoading();

  return next(req).pipe(finalize(() => {
    loadingService.hideLoading();
  }))
}
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Muestra el ng-spinner antes de realizar la petición
    this.spinner.show();

    // Continúa con la petición y oculta el ng-spinner cuando finalice
    return next.handle(req).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}

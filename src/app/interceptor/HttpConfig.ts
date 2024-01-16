import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
//import { ErrorDialogService } from '../main/error/error.service';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    private readonly urlBase: string = environment.apiURL;
    // private readonly urlSispocBase: string = environment.sispocBasePath;
    constructor(
        //    public errorDialogService: ErrorDialogService
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        

        const mybackendUrL = environment.apiURL;
        
        if(request.url.startsWith(mybackendUrL)) {
            
            const token: string = sessionStorage.getItem('Guard');
            if (token && request.headers.get('Custom-Query') == null) {
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            }
            if (request.body instanceof FormData) {
                //request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });            
            }
            else {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }
            //request.headers.set('Origin', 'http://localhost:4200');
    
            if (request.headers.get('Custom-Query') != null) {
                //request.headers.set('timeout', '15000');
                // request = request.clone({ url: `${this.urlSispocBase}${request.url}`, headers: request.headers.set('Accept', 'application/json') });
            }
            else {
                // request = request.clone({ url: `${this.urlBase}${request.url}`, headers: request.headers.set('Accept', 'application/json') });
                request = request.clone({ url: `${request.url}`, headers: request.headers.set('Accept', 'application/json') });
            }
        }

        return next.handle(request);

    }
}
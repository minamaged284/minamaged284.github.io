import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken:any = '';
    if(localStorage.getItem('uToken')){

 userToken = localStorage.getItem('uToken');

    }
let header = request.clone({
  headers:request.headers.set('token',userToken)
})
return next.handle(header);
  }
}

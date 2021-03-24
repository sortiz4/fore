import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelCaseKeys } from '../../utils';

@Injectable()
export class CamelCase implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(
        event => event instanceof HttpResponse ? (
          event.clone({ body: camelCaseKeys(event.body) })
        ) : (
          event
        ),
      ),
    );
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelCaseKeys } from '../../utils';

@Injectable()
export class CamelCase implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mapResponseToCamelCase = (event: HttpEvent<unknown>): HttpEvent<unknown> => {
      return event instanceof HttpResponse ? (
        event.clone({ body: camelCaseKeys(event.body) })
      ) : (
        event
      );
    };

    return next.handle(request).pipe(map(mapResponseToCamelCase));
  }
}

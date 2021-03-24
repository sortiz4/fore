import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {
  }

  createHttpOptions(): Pojo {
    return {
      withCredentials: true,
    };
  }
}

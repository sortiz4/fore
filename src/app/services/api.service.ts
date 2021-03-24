import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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

  getUrl(...args: string[]): string {
    return [environment.api, ...args].join('/');
  }

  getBoards(): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl('boards.json'))
        .toPromise()
    );
  }

  getThreads(board: string): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl(board, 'threads.json'))
        .toPromise()
    );
  }

  getCatalog(board: string): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl(board, 'catalog.json'))
        .toPromise()
    );
  }

  getArchive(board: string): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl(board, 'archive.json'))
        .toPromise()
    );
  }

  getIndices(board: string, page: number): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl(board, `${page}.json`))
        .toPromise()
    );
  }

  getPosts(board: string, thread: number): Promise<unknown> {
    return (
      this.http
        .get(this.getUrl(board, 'thread', `${thread}.json`))
        .toPromise()
    );
  }
}

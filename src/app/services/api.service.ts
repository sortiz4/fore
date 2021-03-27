import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Board, GetBoards, GetCatalog, GetIndices, GetPosts, GetThreads, Thread } from '../../models';

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

  getApiUrl(...args: string[]): string {
    return [environment.api, ...args].join('/');
  }

  getArchive(board: string): Observable<number[]> {
    return (
      this.http
        .get<number[]>(this.getApiUrl(board, 'archive.json'))
    );
  }

  getBoards(): Observable<Board[]> {
    return (
      this.http
        .get<GetBoards>(this.getApiUrl('boards.json'))
        .pipe(map(r => r.boards))
    );
  }

  getCatalog(board: string): Observable<Thread[]> {
    return (
      this.http
        .get<GetCatalog[]>(this.getApiUrl(board, 'catalog.json'))
        .pipe(map(r => r.map(a => a.threads).reduce((a, b) => b.concat(a), [])))
    );
  }

  getIndices(board: string, page: number): Observable<GetIndices> {
    return (
      this.http
        .get<GetIndices>(this.getApiUrl(board, `${page}.json`))
    );
  }

  getPosts(board: string, thread: number): Observable<GetPosts> {
    return (
      this.http
        .get<GetPosts>(this.getApiUrl(board, 'thread', `${thread}.json`))
    );
  }

  getThreads(board: string): Observable<GetThreads> {
    return (
      this.http
        .get<GetThreads>(this.getApiUrl(board, 'threads.json'))
    );
  }
}

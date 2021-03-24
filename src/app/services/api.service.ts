import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetBoards, GetCatalog, GetIndices, GetPosts, GetThreads } from '../../models';

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

  getArchive(board: string): Promise<number[]> {
    return (
      this.http
        .get<number[]>(this.getApiUrl(board, 'archive.json'))
        .toPromise()
    );
  }

  getBoards(): Promise<GetBoards> {
    return (
      this.http
        .get<GetBoards>(this.getApiUrl('boards.json'))
        .toPromise()
    );
  }

  getCatalog(board: string): Promise<GetCatalog> {
    return (
      this.http
        .get<GetCatalog>(this.getApiUrl(board, 'catalog.json'))
        .toPromise()
    );
  }

  getIndices(board: string, page: number): Promise<GetIndices> {
    return (
      this.http
        .get<GetIndices>(this.getApiUrl(board, `${page}.json`))
        .toPromise()
    );
  }

  getPosts(board: string, thread: number): Promise<GetPosts> {
    return (
      this.http
        .get<GetPosts>(this.getApiUrl(board, 'thread', `${thread}.json`))
        .toPromise()
    );
  }

  getThreads(board: string): Promise<GetThreads> {
    return (
      this.http
        .get<GetThreads>(this.getApiUrl(board, 'threads.json'))
        .toPromise()
    );
  }
}

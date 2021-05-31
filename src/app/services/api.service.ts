import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  ApiGetBoards,
  ApiGetCatalog,
  ApiGetIndices,
  ApiGetPosts,
  ApiGetThreads,
  Board,
  mapApiBoardToBoard,
  mapApiPostToPost,
  mapApiThreadToThread,
  Post,
  Thread,
  updatePosts,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {
  }

  getApiUrl(...args: string[]): string {
    return [environment.api, ...args].join('/');
  }

  getArchive(board: Board): Observable<number[]> {
    return (
      this.http
        .get<number[]>(this.getApiUrl(board.path, 'archive.json'))
    );
  }

  getBoards(): Observable<Board[]> {
    return (
      this.http
        .get<ApiGetBoards>(this.getApiUrl('boards.json'))
        .pipe(map(r => r.boards.map(a => mapApiBoardToBoard(a))))
    );
  }

  getCatalog(board: Board): Observable<Thread[]> {
    return (
      this.http
        .get<ApiGetCatalog[]>(this.getApiUrl(board.path, 'catalog.json'))
        .pipe(map(r => r.map(a => a.threads).reduce((a, b) => b.concat(a), []).map(a => mapApiThreadToThread(board, a))))
    );
  }

  getIndices(board: Board, page: number): Observable<ApiGetIndices> {
    return (
      this.http
        .get<ApiGetIndices>(this.getApiUrl(board.path, `${page}.json`))
    );
  }

  getPosts(board: Board, thread: Thread): Observable<Post[]> {
    return (
      this.http
        .get<ApiGetPosts>(this.getApiUrl(board.path, 'thread', `${thread.id}.json`))
        .pipe(map(r => updatePosts(r.posts.slice(1).map(a => mapApiPostToPost(board, thread, a)))))
    );
  }

  getThreads(board: Board): Observable<ApiGetThreads> {
    return (
      this.http
        .get<ApiGetThreads>(this.getApiUrl(board.path, 'threads.json'))
    );
  }
}

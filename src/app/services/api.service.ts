import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Board, GetBoards, GetCatalog, GetIndices, GetPosts, GetThreads, Post, Thread } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {
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

  getPosts(board: string, thread: number): Observable<Post[]> {
    const getPostReplies = (posts: Post[], id: number): number => {
      return posts.filter(p => !!p.com ? p.com.includes(`${id}`) : false).length;
    };

    const updatePosts = (posts: Post[]): Post[] => {
      for (const post of posts) {
        Object.assign(post, { replies: getPostReplies(posts, post.no) });
      }
      return posts;
    };

    return (
      this.http
        .get<GetPosts>(this.getApiUrl(board, 'thread', `${thread}.json`))
        .pipe(map(r => updatePosts(r.posts.slice(1))))
    );
  }

  getThreads(board: string): Observable<GetThreads> {
    return (
      this.http
        .get<GetThreads>(this.getApiUrl(board, 'threads.json'))
    );
  }
}

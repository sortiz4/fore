import { Component, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { InfiniteLoadComponent } from '../../shared/infinite-load/infinite-load.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(InfiniteLoadComponent) infinite: InfiniteLoadComponent;
  posts = this.createPosts();

  createPosts(): boolean[] {
    return Array(5).fill(0).map(Boolean);
  }

  onNextPage(): Promise<void> {
    return (
      timer(1000).toPromise()
        .then(() => this.posts.push(...this.createPosts()))
        .then(() => this.infinite.stop())
    )
  }
}

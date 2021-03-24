import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { timer } from 'rxjs';
import { InfiniteLoadComponent } from '../../shared/infinite-load/infinite-load.component';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  @ViewChild(InfiniteLoadComponent) infinite: InfiniteLoadComponent;
  posts = this.createPosts();

  constructor(private navigation: NavController) {
  }

  createPosts(): boolean[] {
    return Array(5).fill(0).map(Boolean);
  }

  onCancel(): void {
    return this.navigation.back();
  }

  onNextPage(): Promise<void> {
    return (
      timer(1000).toPromise()
        .then(() => this.posts.push(...this.createPosts()))
        .then(() => this.infinite.stop())
    )
  }
}

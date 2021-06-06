import { Component, Input, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { PageComponent } from '../page/page.component';
import { Api } from '../../services/api.service';
import { Post, Thread } from '../../../models';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.scss'],
})
export class ViewThreadComponent implements ViewWillEnter {
  @Input() modal: HTMLIonModalElement;
  @Input() thread: Thread;
  @ViewChild(PageComponent) page: PageComponent;
  posts$: Promise<Post[]>;

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    this.page.startRefreshing();
  }

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onRefresh(event: CustomEvent): void {
    const getPromise = (): Promise<void> => {
      return event ? (event.target as HTMLIonRefresherElement).complete() : this.page.stopRefreshing();
    };

    const onStop = (posts: Post[]): Promise<Post[]> => {
      return getPromise().then(() => posts);
    };

    this.posts$ = this.api.getPosts(this.thread.board, this.thread).toPromise().then(onStop);
  }
}

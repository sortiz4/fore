import { Component, Input, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  posts: Post[];
  refreshEvent: Subscription;

  get hasPosts(): boolean {
    return !!this.posts;
  }

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    this.onRefresh();
  }

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onRefresh(): void {
    // Cancel the current request
    this.refreshEvent?.unsubscribe?.();

    // Start the next request
    this.refreshEvent = (
      this.page
        .doSafeRefresh(() => this.api.getPosts(this.thread.board, this.thread))
        .subscribe(p => this.posts = p)
    );
  }
}

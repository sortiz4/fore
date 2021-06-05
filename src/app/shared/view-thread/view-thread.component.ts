import { Component, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';
import { Thread } from '../../../models';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.scss'],
})
export class ViewThreadComponent implements ViewWillEnter {
  @Input() modal: HTMLIonModalElement;
  @Input() thread: Thread;
  posts$: Observable<unknown>;

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    this.posts$ = this.api.getPosts(this.thread.board, this.thread);
  }

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }
}

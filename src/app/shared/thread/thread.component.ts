import { Component, Input } from '@angular/core';
import { ViewThreadComponent } from '../view-thread/view-thread.component';
import { Modal } from '../../services/modal.service';
import { Board, Thread } from '../../../models';
import { getId, getLink, getMedia, getReplies, getThumbnail, getTitle, isImage, isVideo } from '../../../utils';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() board: Board;
  @Input() thread: Thread;
  @Input() clickable = true;

  get filename(): string {
    return `${this.thread.filename}${this.thread.ext}`;
  }

  get id(): string {
    return getId(this.thread.no);
  }

  get isImage(): boolean {
    return isImage(this.thread.ext);
  }

  get isVideo(): boolean {
    return isVideo(this.thread.ext);
  }

  get link(): string {
    return getLink(this.thread.no);
  }

  get media(): string {
    return getMedia(this.thread.tim, this.board.board, this.thread.ext);
  }

  get name(): string {
    return this.thread.name;
  }

  get replies(): string {
    return getReplies(this.thread.replies);
  }

  get text(): string {
    return this.thread.com;
  }

  get thumbnail(): string {
    return getThumbnail(this.thread.tim, this.board.board);
  }

  get time(): number {
    return this.thread.tim;
  }

  get title(): string {
    return getTitle(this.thread.sub, this.thread.no);
  }

  constructor(private modal: Modal) {
  }

  onClick(event: MouseEvent): Promise<HTMLIonModalElement | void> {
    event.stopImmediatePropagation();
    if (this.clickable) {
      const options = {
        component: ViewThreadComponent,
        componentProps: {
          board: this.board,
          thread: this.thread,
          title: this.title,
        },
        cssClass: 'app-modal-fullscreen',
      };
      return this.modal.openWindow(options).toPromise();
    }
    return Promise.resolve();
  }
}

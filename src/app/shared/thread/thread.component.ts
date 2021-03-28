import { Component, Input } from '@angular/core';
import { ViewMediaComponent } from '../view-media/view-media.component';
import { ViewThreadComponent } from '../view-thread/view-thread.component';
import { Modal } from '../../services/modal.service';
import { Board, Thread } from '../../../models';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() board: Board;
  @Input() thread: Thread;

  get isImage(): boolean {
    switch (this.thread.ext) {
      case '.gif':
      case '.jpeg':
      case '.jpg':
      case '.png':
      case '.webp':
        return true;
    }
    return false;
  }

  get isVideo(): boolean {
    switch (this.thread.ext) {
      case '.mp4':
      case '.webm':
        return true;
    }
    return false;
  }

  get media(): string {
    return `${this.url}/${this.board.board}/${this.thread.tim}${this.thread.ext}`;
  }

  get name(): string {
    return this.thread.name;
  }

  get replies(): string {
    return `${this.thread.replies} ${this.thread.replies === 1 ? 'reply' : 'replies'}`;
  }

  get text(): string {
    return this.thread.com;
  }

  get thumbnail(): string {
    return `${this.url}/${this.board.board}/${this.thread.tim}s.jpg`;
  }

  get time(): number {
    return this.thread.tim;
  }

  get title(): string {
    return this.thread.sub ?? `No. ${this.thread.no}`;
  }

  get url(): string {
    return 'https://i.4cdn.org';
  }

  constructor(private modal: Modal) {
  }

  onClickMedia(event: MouseEvent): Promise<HTMLIonModalElement> {
    event.stopImmediatePropagation();
    const options = {
      component: ViewMediaComponent,
      componentProps: {
        isImage: this.isImage,
        isVideo: this.isVideo,
        media: this.media,
      },
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };
    return this.modal.openWindow(options).toPromise();
  }

  onClickThread(event: MouseEvent): Promise<HTMLIonModalElement> {
    event.stopImmediatePropagation();
    const options = {
      component: ViewThreadComponent,
      componentProps: {
        board: this.board,
        thread: this.thread,
      },
      cssClass: 'app-modal-fullscreen',
    };
    return this.modal.openWindow(options).toPromise();
  }
}

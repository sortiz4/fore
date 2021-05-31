import { Component, Input } from '@angular/core';
import { ViewThreadComponent } from '../view-thread/view-thread.component';
import { Modal } from '../../services/modal.service';
import { Board, FileType, Thread } from '../../../models';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() board: Board;
  @Input() thread: Thread;
  @Input() clickable = true;

  get fileCanBePreviewed(): boolean {
    return this.thread.fileCanBePreviewed;
  }

  get fileName(): string {
    return this.thread.fileName;
  }

  get fileThumbnail(): string {
    return this.thread.fileThumbnail;
  }

  get fileType(): FileType {
    return this.thread.fileType;
  }

  get fileUrl(): string {
    return this.thread.fileUrl;
  }

  get id(): number {
    return this.thread.id;
  }

  get link(): string {
    return this.thread.link;
  }

  get name(): string {
    return this.thread.name;
  }

  get replies(): string {
    return this.thread.replyText;
  }

  get text(): string {
    return this.thread.text;
  }

  get time(): number {
    return this.thread.time;
  }

  get title(): string {
    return this.thread.title;
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

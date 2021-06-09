import { Component, Input } from '@angular/core';
import { Modal } from '../../services/modal.service';
import { Thread } from '../../../models';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() thread: Thread;
  @Input() clickable = true;

  constructor(private modal: Modal) {
  }

  onClick(event: MouseEvent): Promise<HTMLIonModalElement> {
    event.stopImmediatePropagation();
    if (this.clickable) {
      const options = {
        componentProps: {
          thread: this.thread,
        },
      };
      return this.modal.openViewThreadWindow(options).toPromise();
    }
  }
}

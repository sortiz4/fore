import { Component, Input } from '@angular/core';
import { ViewThreadComponent } from '../view-thread/view-thread.component';
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
        component: ViewThreadComponent,
        componentProps: {
          thread: this.thread,
        },
      };
      return this.modal.openFullscreenWindow(options).toPromise();
    }
  }
}

import { Component, Input } from '@angular/core';
import { ViewThreadComponent } from '../view-thread/view-thread.component';
import { Overlay } from '../../services/overlay.service';
import { Thread } from '../../../models';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() thread: Thread;
  @Input() clickable = true;

  constructor(private overlay: Overlay) {
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
      return this.overlay.openPageModal(options).toPromise();
    }
  }
}

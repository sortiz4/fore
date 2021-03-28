import { Component, Input } from '@angular/core';
import { Board, Thread } from '../../../models';

@Component({
  selector: 'app-view-thread',
  templateUrl: './view-thread.component.html',
  styleUrls: ['./view-thread.component.scss'],
})
export class ViewThreadComponent {
  @Input() board: Board;
  @Input() modal: HTMLIonModalElement;
  @Input() thread: Thread;
  
  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }
}

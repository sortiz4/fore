import { Component, Input } from '@angular/core';
import { Thread } from '../../../models';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
  @Input() board: string;
  @Input() thread: Thread;

  get thumbnail(): string {
    return `http://i.4cdn.org/${this.board}/${this.thread.tim}s.jpg`;
  }
}

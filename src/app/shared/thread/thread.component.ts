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

  get image(): string {
    return `${this.url}/${this.board}/${this.thread.tim}${this.thread.ext}`;
  }

  get name(): string {
    return this.thread.name;
  }

  get text(): string {
    return this.thread.com;
  }

  get thumbnail(): string {
    return `${this.url}/${this.board}/${this.thread.tim}s.jpg`;
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

  onClick(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }
}

import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  get image(): string {
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

  constructor(private navigation: NavController) {
  }

  onClickMedia(event: MouseEvent): Promise<boolean> {
    event.stopImmediatePropagation();
    return this.navigation.navigateForward('/b/view-media');
  }

  onClickThread(event: MouseEvent): Promise<boolean> {
    event.stopImmediatePropagation();
    return this.navigation.navigateForward('/b/view-thread');
  }
}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-load',
  templateUrl: './infinite-load.component.html',
  styleUrls: ['./infinite-load.component.scss'],
})
export class InfiniteLoadComponent {
  @Output() load = new EventEmitter<void>();
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;

  start(): Promise<void> {
    return (
      Promise.resolve()
        .then(() => (this.scroll as any).el.classList.add('infinite-scroll-loading'))
        .then(() => this.load.emit())
    );
  }

  stop(): Promise<void> {
    return this.scroll.complete();
  }
}

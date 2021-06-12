import { Component, ElementRef, Input } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import Mark from 'mark.js';
import { Post, Thread } from '../../../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements ViewWillEnter {
  @Input() modal: HTMLIonModalElement;
  @Input() posts: Post[];
  @Input() thread: Thread;
  @Input() threads: Thread[];
  mark: Mark;
  search: string;

  get isBoardMode(): boolean {
    return !!this.threads;
  }

  get isThreadMode(): boolean {
    return !!this.thread && !!this.posts;
  }

  constructor(private element: ElementRef) {
  }

  ionViewWillEnter(): void {
    this.mark = new Mark(this.element.nativeElement);
  }

  onCancel(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onChange(event: CustomEvent): void {
    this.search = event.detail.value;
    this.mark.unmark();
    this.mark.mark(this.search);
  }
}

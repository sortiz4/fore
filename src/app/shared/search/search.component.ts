import { Component, ElementRef, Input } from '@angular/core';
import Mark from 'mark.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() modal: HTMLIonModalElement;
  mark: Mark;
  search: string;

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

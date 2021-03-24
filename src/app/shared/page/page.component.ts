import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input() showBack = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  get showClose(): boolean {
    return this.close.observers.length > 0;
  }

  get showSave(): boolean {
    return this.save.observers.length > 0;
  }

  get showSubmit(): boolean {
    return this.submit.observers.length > 0;
  }
}

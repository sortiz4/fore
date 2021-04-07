import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [
    trigger(
      'fab',
      [
        state('true', style({ transform: 'scale(0)' })),
        state('false', style({ transform: 'scale(1)' })),
        transition('* <=> *', animate('250ms ease-in-out')),
      ],
    ),
  ],
})
export class ContentComponent {
  @Input() canScrollToTop = false;
  @Output() refresh = new EventEmitter<CustomEvent>();
  @ViewChild(IonContent) content: IonContent;
  isFabHidden = true;

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
  }

  onScroll(event: CustomEvent): void {
    this.isFabHidden = event.detail.deltaY > 0;
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

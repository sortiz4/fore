import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';
import { Thread } from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
export class HomePage implements ViewWillEnter {
  @ViewChild(IonContent) content: IonContent;
  board: string;
  catalog$: Observable<Thread[]>;
  isFabHidden = true;

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = 'tv';
    }
    if (!this.catalog$) {
      this.catalog$ = this.api.getCatalog(this.board);
    }
  }

  onScroll(event: CustomEvent): void {
    if (event.detail.deltaY > 0) {
      this.isFabHidden = true;
    } else if (event.detail.deltaY < 0) {
      this.isFabHidden = false;
    }
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

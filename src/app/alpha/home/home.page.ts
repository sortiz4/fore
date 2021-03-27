import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';
import { Modal } from '../../services/modal.service';
import { State } from '../../services/state.service';
import { Board, Thread } from '../../../models';

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
  board: Board;
  catalog$: Observable<Thread[]>;
  isFabHidden = true;

  get title(): string {
    if (!this.board) {
      return '';
    }
    return `/${this.board.board}/ - ${this.board.title}`;
  }

  constructor(private api: Api, private modal: Modal, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards[60];
    }
    if (!this.catalog$) {
      this.catalog$ = this.api.getCatalog(this.board.board);
    }
  }

  onChangeBoard(board: Board): void {
    if (this.board.board !== board.board) {
      // Set the board
      this.board = board;

      // Update the catalog
      this.catalog$ = this.api.getCatalog(this.board.board);
    }
  }

  onSelectBoard(): Promise<HTMLIonAlertElement> {
    const options = {
      header: 'Boards',
      inputs: (
        this.state
          .get()
          .boards
          .map(b => ({ label: `/${b.board}/ - ${b.title}`, name: b.board, type: 'radio', value: b }))
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: v => this.onChangeBoard(v),
        },
      ],
    };
    return this.modal.createAlert(options).toPromise();
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

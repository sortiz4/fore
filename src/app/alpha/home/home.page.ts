import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';
import { Modal } from '../../services/modal.service';
import { State } from '../../services/state.service';
import { SelectBoardComponent } from '../../shared/select-board/select-board.component';
import { Board, Thread } from '../../../models';
import { random } from '../../../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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

  getRandomBoard(): Board {
    const boards = this.state.get().boards;
    return boards[random(0, boards.length - 1)];
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.getRandomBoard();
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

  onRefresh(): void {
    this.catalog$ = void 0;
    this.ionViewWillEnter();
  }

  onSelectBoard(): Promise<HTMLIonModalElement> {
    const onOpen = (modal: HTMLIonModalElement): HTMLIonModalElement => {
      // Change the board
      modal.onDidDismiss().then(v => v.data ? this.onChangeBoard(v.data) : void 0);

      // Forward the modal
      return modal;
    };

    const options = {
      component: SelectBoardComponent,
    };

    return (
      this.modal
        .openWindow(options)
        .toPromise()
        .then(onOpen)
    );
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

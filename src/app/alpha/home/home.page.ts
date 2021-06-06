import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Api } from '../../services/api.service';
import { Modal } from '../../services/modal.service';
import { State } from '../../services/state.service';
import { PageComponent } from '../../shared/page/page.component';
import { SelectBoardComponent } from '../../shared/select-board/select-board.component';
import { Board, Thread } from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  @ViewChild(PageComponent) page: PageComponent;
  board: Board;
  catalog$: Promise<Thread[]>;

  constructor(private api: Api, private modal: Modal, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards[0];
    }
    if (!this.catalog$) {
      this.page.startRefreshing();
    }
  }

  onChangeBoard(board: Board): void {
    if (this.board.path !== board.path) {
      // Set the board
      this.board = board;

      // Update the catalog
      this.page.startRefreshing();
    }
  }

  onRefresh(event: CustomEvent): void {
    const getPromise = (): Promise<void> => {
      return event ? (event.target as HTMLIonRefresherElement).complete() : this.page.stopRefreshing();
    };

    const onStop = (catalog: Thread[]): Promise<Thread[]> => {
      return getPromise().then(() => catalog);
    };

    this.catalog$ = this.api.getCatalog(this.board).toPromise().then(onStop);
  }

  onSelectBoard(): Promise<HTMLIonModalElement> {
    const onOpen = (modal: HTMLIonModalElement): HTMLIonModalElement => {
      // Change the board
      modal.onDidDismiss().then(v => v.data ? this.onChangeBoard(v.data) : void 0);

      // Forward the modal
      return modal;
    };

    return (
      this.modal
        .openWindow({ component: SelectBoardComponent })
        .toPromise()
        .then(onOpen)
    );
  }
}

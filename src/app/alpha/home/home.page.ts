import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
  catalog: Thread[];
  refreshEvent: Subscription;

  get hasCatalog(): boolean {
    return !!this.catalog;
  }

  constructor(private api: Api, private modal: Modal, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards[0];
    }
    if (!this.hasCatalog) {
      this.onSelectNewBoard();
    }
  }

  onChangeBoard(board: Board): void {
    if (this.board.path !== board.path) {
      // Set the board
      this.board = board;

      // Update the catalog
      this.onSelectNewBoard();
    }
  }

  async onRefresh(): Promise<void> {
    if (this.refreshEvent) {
      this.refreshEvent.unsubscribe();
    }

    this.refreshEvent = (
      this.page
        .doSafeRefresh(() => this.api.getCatalog(this.board))
        .subscribe(c => this.catalog = c)
    );
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

  onSelectNewBoard(): void {
    this.catalog = void 0;
    this.onRefresh();
  }
}

import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from '../../services/api.service';
import { Modal } from '../../services/modal.service';
import { State } from '../../services/state.service';
import { PageComponent } from '../../shared/page/page.component';
import { Board, Thread } from '../../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  @ViewChild(PageComponent) page: PageComponent;
  board: Board;
  threads: Thread[];
  refreshEvent: Subscription;

  get hasThreads(): boolean {
    return !!this.threads;
  }

  constructor(private api: Api, private modal: Modal, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards[0];
    }
    if (!this.hasThreads) {
      this.onSelectNewBoard();
    }
  }

  onChangeBoard(board: Board): void {
    if (this.board.path !== board.path) {
      // Set the board
      this.board = board;

      // Update the threads
      this.onSelectNewBoard();
    }
  }

  async onRefresh(): Promise<void> {
    // Cancel the current request
    this.refreshEvent?.unsubscribe?.();

    // Start the next request
    this.refreshEvent = (
      this.page
        .doSafeRefresh(() => this.api.getCatalog(this.board))
        .subscribe(c => this.threads = c)
    );
  }

  onSearch(): Promise<HTMLIonModalElement> {
    const options = {
      componentProps: {
        threads: this.threads,
      },
    };
    return this.modal.openSearchWindow(options).toPromise();
  }

  onSelectBoard(): Promise<HTMLIonModalElement> {
    const onOpen = (modal: HTMLIonModalElement): HTMLIonModalElement => {
      // Change the board
      void modal.onDidDismiss().then(v => v.data ? this.onChangeBoard(v.data) : void 0);

      // Forward the modal
      return modal;
    };

    return this.modal.openSelectBoardWindow().toPromise().then(onOpen);
  }

  onSelectNewBoard(): void {
    this.threads = void 0;
    this.onRefresh();
  }
}

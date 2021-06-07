import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Subscription, timer } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
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
    return this.catalog?.length > 0;
  }

  constructor(private api: Api, private modal: Modal, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards[0];
    }
    if (!this.hasCatalog) {
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

  async onRefresh(event?: CustomEvent): Promise<void> {
    const onStop = (): Promise<void> => {
      return event ? (event.target as HTMLIonRefresherElement).complete() : this.page.stopRefreshing();
    };

    if (this.refreshEvent) {
      this.refreshEvent.unsubscribe();
    }

    this.refreshEvent = (
      this.api
        .getCatalog(this.board)
        .pipe(delay(2000))
        .pipe(finalize((onStop)))
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
}

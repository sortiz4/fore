import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { firstValueFrom, Subscription } from 'rxjs';
import { Api } from '../../services/api.service';
import { Overlay } from '../../services/overlay.service';
import { State } from '../../services/state.service';
import { PageComponent } from '../../shared/page/page.component';
import { SearchComponent } from '../../shared/search/search.component';
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
  threads: Thread[];
  refreshEvent: Subscription;

  get hasThreads(): boolean {
    return !!this.threads;
  }

  constructor(private api: Api, private overlay: Overlay, private state: State) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = this.state.get().boards.find(b => !this.state.get().hidden[b.path]);
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

  onRefresh(): void {
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
      component: SearchComponent,
      componentProps: {
        threads: this.threads,
      },
    };
    return firstValueFrom(this.overlay.openPageModal(options));
  }

  onSelectBoard(): Promise<HTMLIonModalElement> {
    const onOpen = (modal: HTMLIonModalElement): HTMLIonModalElement => {
      // Change the board
      void modal.onDidDismiss().then(v => v.data ? this.onChangeBoard(v.data) : void 0);

      // Forward the modal
      return modal;
    };

    const options = {
      component: SelectBoardComponent,
    };

    return firstValueFrom(this.overlay.openModal(options)).then(onOpen);
  }

  onSelectNewBoard(): void {
    this.threads = void 0;
    this.onRefresh();
  }
}

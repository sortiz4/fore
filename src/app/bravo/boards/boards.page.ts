import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { State } from '../../services/state.service';
import { Storage } from '../../services/storage.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.page.html',
  styleUrls: ['./boards.page.scss'],
})
export class BoardsPage implements ViewWillEnter {
  boards: Board[];

  constructor(private state: State, private storage: Storage) {
  }

  getColor(board: Board): string {
    if (this.isEnabled(board)) {
      return 'primary';
    }
    return 'dark';
  }

  getIcon(board: Board): string {
    if (this.isEnabled(board)) {
      return 'checkmark-outline';
    }
    return 'close-outline';
  }

  getLabel(board: Board): string {
    if (this.isEnabled(board)) {
      return 'Enabled';
    }
    return 'Disabled';
  }

  ionViewWillEnter(): void {
    this.boards = this.state.get().boards;
  }

  isEnabled(board: Board): boolean {
    return !this.state.get().blocked[board.path];
  }

  onToggle(board: Board): Promise<void> {
    const blocked = {
      ...this.state.get().blocked,
      [board.path]: !this.state.get().blocked[board.path],
    };
    return this.storage.setState(this.state.set({ blocked }).get()).then(() => void 0);
  }
}

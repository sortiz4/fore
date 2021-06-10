import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Database } from '../../services/database.service';
import { State } from '../../services/state.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.page.html',
  styleUrls: ['./boards.page.scss'],
})
export class BoardsPage implements ViewWillEnter {
  boards: Board[];

  constructor(private database: Database, private state: State) {
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
    return !this.state.get().hidden[board.path];
  }

  onToggle(board: Board): Promise<void> {
    const hidden = {
      ...this.state.get().hidden,
      [board.path]: !this.state.get().hidden[board.path],
    };
    return this.database.setState(this.state.set({ hidden }).get()).then(() => void 0);
  }
}

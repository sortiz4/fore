import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { State } from '../../services/state.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.page.html',
  styleUrls: ['./boards.page.scss'],
})
export class BoardsPage implements ViewWillEnter {
  boards: Board[];

  constructor(private state: State) {
  }

  ionViewWillEnter(): void {
    this.boards = this.state.get().boards;
  }
}

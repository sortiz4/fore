import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-boards',
  templateUrl: 'boards.page.html',
  styleUrls: ['boards.page.scss'],
})
export class BoardsPage {
  boards$: Observable<Board[]>;

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    if (!this.boards$) {
      this.boards$ = this.api.getBoards();
    }
  }
}

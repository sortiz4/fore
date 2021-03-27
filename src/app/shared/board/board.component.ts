import { Component, Input } from '@angular/core';
import { Board } from '../../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board;

  get description(): string {
    return this.board.metaDescription;
  }

  get path(): string {
    return this.board.board;
  }

  get title(): string {
    return this.board.title;
  }

  onClick(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }
}

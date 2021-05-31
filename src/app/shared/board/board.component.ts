import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board;
  @Output() select = new EventEmitter<void>();

  get description(): string {
    return this.board.description;
  }

  get name(): string {
    return this.board.name;
  }

  get path(): string {
    return this.board.path;
  }
}

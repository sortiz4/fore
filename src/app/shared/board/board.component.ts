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
}

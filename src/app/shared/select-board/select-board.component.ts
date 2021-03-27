import { Component, ElementRef } from '@angular/core';
import Mark from 'mark.js';
import { State } from '../../services/state.service';
import { Board } from '../../../models';

@Component({
  selector: 'app-select-board',
  templateUrl: './select-board.component.html',
  styleUrls: ['./select-board.component.scss'],
})
export class SelectBoardComponent {
  boards: Board[];
  mark: Mark;
  modal: HTMLIonModalElement;
  search: string;

  constructor(private element: ElementRef, private state: State) {
  }

  ionViewWillEnter(): void {
    this.boards = this.state.get().boards;
    this.mark = new Mark(this.element.nativeElement);
  }

  onCancel(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onChange(event: CustomEvent): void {
    this.search = event.detail.value;
    this.mark.unmark().mark(this.search);
  }

  onSelect(board: Board): Promise<boolean> {
    return this.modal.dismiss(board);
  }
}

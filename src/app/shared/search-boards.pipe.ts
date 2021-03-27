import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models';

@Pipe({
  name: 'searchBoards',
})
export class SearchBoardsPipe implements PipeTransform {
  transform(boards: Board[], text: string = ''): Board[] {
    const trimmed = text.trim();
    switch (trimmed.length) {
      case 0:
        return boards;
    }
    return this.filter(boards, trimmed);
  }

  filter(boards: Board[], text: string): Board[] {
    const filterBoards = (board: Board): boolean => {
      return (
        !!board.board.match(pattern) ||
        !!board.title.match(pattern) ||
        !!board.metaDescription.match(pattern)
      );
    };
    const pattern = new RegExp(text, 'i');
    return boards.filter(filterBoards);
  }
}

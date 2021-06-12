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
    return this.filter(boards, new RegExp(trimmed, 'i'));
  }

  filter(boards: Board[], pattern: RegExp): Board[] {
    const filter = (board: Board): boolean => {
      return (
        pattern.test(board.description) ||
        pattern.test(board.name) ||
        pattern.test(board.path)
      );
    };
    return boards.filter(filter);
  }
}

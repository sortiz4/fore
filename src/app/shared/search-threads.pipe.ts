import { Pipe, PipeTransform } from '@angular/core';
import { Thread } from '../../models';

@Pipe({
  name: 'searchThreads',
})
export class SearchThreadsPipe implements PipeTransform {
  transform(threads: Thread[], text: string = ''): Thread[] {
    const trimmed = text.trim();
    switch (trimmed.length) {
      case 0:
        return threads;
    }
    return this.filter(threads, trimmed);
  }

  filter(threads: Thread[], text: string): Thread[] {
    const filterBoards = (thread: Thread): boolean => {
      return (
        !!thread.author.match(pattern) ||
        !!thread.text?.match?.(pattern) ||
        !!thread.title.match(pattern)
      );
    };
    const pattern = new RegExp(text, 'i');
    return threads.filter(filterBoards);
  }
}

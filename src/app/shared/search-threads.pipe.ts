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
    return this.filter(threads, new RegExp(trimmed, 'i'));
  }

  filter(threads: Thread[], pattern: RegExp): Thread[] {
    const filter = (thread: Thread): boolean => {
      return (
        pattern.test(thread.author) ||
        pattern.test(thread.text) ||
        pattern.test(thread.title)
      );
    };

    return threads.filter(filter);
  }
}

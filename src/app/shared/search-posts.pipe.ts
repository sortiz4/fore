import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../../models';

@Pipe({
  name: 'searchPosts',
})
export class SearchPostsPipe implements PipeTransform {
  transform(posts: Post[], text: string = ''): Post[] {
    const trimmed = text.trim();
    switch (trimmed.length) {
      case 0:
        return posts;
    }
    return this.filter(posts, trimmed);
  }

  filter(posts: Post[], text: string): Post[] {
    const filterBoards = (post: Post): boolean => {
      return (
        !!post.author.match(pattern) ||
        !!post.text?.match?.(pattern)
      );
    };
    const pattern = new RegExp(text, 'i');
    return posts.filter(filterBoards);
  }
}

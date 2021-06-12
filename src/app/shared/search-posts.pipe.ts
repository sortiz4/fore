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
    return this.filter(posts, new RegExp(trimmed, 'i'));
  }

  filter(posts: Post[], pattern: RegExp): Post[] {
    const filter = (post: Post): boolean => {
      return (
        pattern.test(post.author) ||
        pattern.test(post.text)
      );
    };

    return posts.filter(filter);
  }
}

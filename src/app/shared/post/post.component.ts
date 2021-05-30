import { Component, Input } from '@angular/core';
import { Board, Post } from '../../../models';
import { getId, getLink, getMedia, getReplies, getThumbnail, isImage, isVideo } from '../../../utils';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() board: Board;
  @Input() post: Post;

  get filename(): string {
    return `${this.post.filename}${this.post.ext}`;
  }

  get id(): string {
    return getId(this.post.no);
  }

  get isImage(): boolean {
    return isImage(this.post.ext);
  }

  get isVideo(): boolean {
    return isVideo(this.post.ext);
  }

  get link(): string {
    return getLink(this.post.no);
  }

  get media(): string {
    return getMedia(this.post.tim, this.board.board, this.post.ext);
  }

  get name(): string {
    return this.post.name;
  }

  get replies(): string {
    return getReplies(this.post.replies);
  }

  get text(): string {
    return this.post.com;
  }

  get thumbnail(): string {
    return getThumbnail(this.post.tim, this.board.board);
  }

  get time(): number {
    return this.post.tim;
  }
}

import { Component, Input } from '@angular/core';
import { Board, FileType, Post } from '../../../models';
import { getFileName, getFileType, getId, getLink, getMedia, getReplies, getThumbnail } from '../../../utils';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() board: Board;
  @Input() post: Post;

  get fileName(): string {
    return getFileName(this.post.filename, this.post.ext);
  }

  get fileType(): FileType {
    return getFileType(this.post.ext);
  }

  get id(): string {
    return getId(this.post.no);
  }

  get isKnownFileType(): boolean {
    return this.fileType !== FileType.Unknown;
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

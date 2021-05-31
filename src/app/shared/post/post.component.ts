import { Component, Input } from '@angular/core';
import { FileType, Post } from '../../../models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;

  get fileCanBePreviewed(): boolean {
    return this.post.fileCanBePreviewed;
  }

  get fileName(): string {
    return this.post.fileName;
  }

  get fileThumbnail(): string {
    return this.post.fileThumbnail;
  }

  get fileType(): FileType {
    return this.post.fileType;
  }

  get fileUrl(): string {
    return this.post.fileUrl;
  }

  get id(): number {
    return this.post.id;
  }

  get link(): string {
    return this.post.link;
  }

  get name(): string {
    return this.post.name;
  }

  get replies(): string {
    return this.post.replyText;
  }

  get text(): string {
    return this.post.text;
  }

  get time(): number {
    return this.post.time;
  }
}

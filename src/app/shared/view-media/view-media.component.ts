import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent {
  @Input() isImage: boolean;
  @Input() isVideo: boolean;
  @Input() media: string;
  @Input() modal: HTMLIonModalElement;

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }
}

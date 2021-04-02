import { Component, Input } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

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
  @Input() name: string;

  constructor(private transfer: FileTransfer) {
  }

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onDownload(): Promise<unknown> {
    return (
      this.transfer
        .create()
        .download(this.media, this.name)
    );
  }
}

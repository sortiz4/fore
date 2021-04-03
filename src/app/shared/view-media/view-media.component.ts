import { Component, Input } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SystemUi } from '../../services/system-ui.service';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent implements ViewWillEnter, ViewWillLeave {
  @Input() isImage: boolean;
  @Input() isVideo: boolean;
  @Input() media: string;
  @Input() modal: HTMLIonModalElement;
  @Input() name: string;

  constructor(private systemUi: SystemUi, private transfer: FileTransfer) {
  }

  ionViewWillEnter(): void {
    this.systemUi.hide();
  }

  ionViewWillLeave(): void {
    this.systemUi.show();
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

import { Component, Input } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ColorScheme } from '../../services/color-scheme.service';
import { FileSystem } from '../../services/file-system.service';

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

  constructor(private colorScheme: ColorScheme, private fileSystem: FileSystem) {
  }

  ionViewWillEnter(): void {
    this.colorScheme.toggleMedia();
  }

  ionViewWillLeave(): void {
    this.colorScheme.toggleMedia();
  }

  onClose(): Promise<boolean> {
    return this.modal.dismiss();
  }

  onDownload(): Promise<void> {
    return this.fileSystem.download(this.media, this.name);
  }
}

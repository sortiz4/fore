import { Component, Input } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { FileType } from '../../../models';
import { ColorScheme } from '../../services/color-scheme.service';
import { FileSystem } from '../../services/file-system.service';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent implements ViewWillEnter, ViewWillLeave {
  @Input() modal: HTMLIonModalElement;
  @Input() name: string;
  @Input() type: FileType;
  @Input() url: string;

  get isImage(): boolean {
    return this.type === FileType.Image;
  }

  get isVideo(): boolean {
    return this.type === FileType.Video;
  }

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
    return this.fileSystem.download(this.url, this.name);
  }
}

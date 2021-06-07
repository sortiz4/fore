import { Component, Input } from '@angular/core';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { FileType } from '../../../models';
import { ColorScheme } from '../../services/color-scheme.service';
import { System } from '../../services/system.service';

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

  constructor(private colorScheme: ColorScheme, private system: System) {
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

  onCopy(): Promise<string> {
    return this.system.writeToClipboard(this.url);
  }

  onDownload(): Promise<void> {
    return this.system.download(this.url, this.name);
  }

  onOpen(): Promise<void> {
    return this.system.openUrl(this.url);
  }

  onShare(): Promise<void> {
    return this.system.shareUrl(this.url);
  }
}

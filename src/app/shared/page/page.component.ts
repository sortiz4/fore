import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sheet } from '../../services/sheet.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input() showBack = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  get showClose(): boolean {
    return this.close.observers.length > 0;
  }

  get showDownload(): boolean {
    return this.download.observers.length > 0;
  }

  get showOptions(): boolean {
    return this.showDownload;
  }

  get showSave(): boolean {
    return this.save.observers.length > 0;
  }

  get showSubmit(): boolean {
    return this.submit.observers.length > 0;
  }

  constructor(private sheet: Sheet) {
  }

  onOptions(): Promise<HTMLIonActionSheetElement> {
    const buttons = [
      this.showDownload ? (
        {
          icon: 'download-outline',
          text: 'Download',
          handler: () => this.download.emit(),
        }
      ) : (
        null
      ),
      {
        icon: 'share-social-outline',
        text: 'Share',
      },
      {
        icon: 'close',
        role: 'cancel',
        text: 'Cancel',
      },
    ];
    const options = {
      header: 'Options',
      buttons: buttons.filter(b => !!b),
    };
    return this.sheet.openActions(options);
  }
}

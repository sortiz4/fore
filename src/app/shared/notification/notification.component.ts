import { Component } from '@angular/core';
import { Sheet } from '../../services/sheet.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(private sheet: Sheet) {
  }

  onOptions(): Promise<HTMLIonActionSheetElement> {
    const options = {
      header: 'Options',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          text: 'Cancel',
          handler: () => void 0,
        },
      ],
    };
    return this.sheet.openActions(options);
  }
}

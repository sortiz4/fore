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
    return this.sheet.openActions();
  }
}

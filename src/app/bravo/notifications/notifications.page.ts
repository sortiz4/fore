import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
})
export class NotificationsPage {
  notifications = Array(15).fill(0).map(Boolean);
}

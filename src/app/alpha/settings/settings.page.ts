import { Component } from '@angular/core';
import { ColorScheme } from '../../services/color-scheme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  constructor(private colorScheme: ColorScheme) {
  }

  onToggleColorScheme(): void {
    this.colorScheme.toggle();
  }
}

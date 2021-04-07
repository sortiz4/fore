import { Component } from '@angular/core';
import { ColorScheme } from '../../services/color-scheme.service';
import { State } from '../../services/state.service';
import { Storage } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  get dark(): boolean {
    return this.state.get().dark;
  }

  constructor(private colorScheme: ColorScheme, private state: State, private storage: Storage) {
  }

  onToggleColorScheme(event: CustomEvent): Promise<void> {
    return (
      this.storage
        .setState(this.state.set({ dark: event.detail.checked }).get())
        .then(() => this.colorScheme.toggle())
    );
  }
}

import { Component } from '@angular/core';
import { Database } from '../../services/database.service';
import { State } from '../../services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  get useThumbnails(): boolean {
    return this.state.get().useThumbnails;
  }

  constructor(private database: Database, private state: State) {
  }

  onToggleUseThumbnails(event: CustomEvent): Promise<void> {
    return (
      this.database
        .setState(this.state.set({ useThumbnails: event.detail.checked }).get())
        .then(() => void 0)
    );
  }
}

import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Api } from '../../services/api.service';
import { Database } from '../../services/database.service';
import { Notification } from '../../services/notification.service';
import { Overlay } from '../../services/overlay.service';
import { State } from '../../services/state.service';
import { System } from '../../services/system.service';
import { LicenseComponent } from '../../shared/license/license.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  get useThumbnails(): boolean {
    return this.state.get().useThumbnails;
  }

  get version(): string {
    return environment.version;
  }

  constructor(
    private api: Api,
    private database: Database,
    private notification: Notification,
    private overlay: Overlay,
    private state: State,
    private system: System,
  ) {
  }

  onGetHelp(): Promise<void> {
    return this.system.openUrl(environment.help);
  }

  async onGetLicenses(): Promise<void> {
    try {
      const options = {
        component: LicenseComponent,
        componentProps: {
          text: await firstValueFrom(this.api.getLicenses()),
        },
      };
      await firstValueFrom(this.overlay.openModal(options));
    } catch {
      await firstValueFrom(this.notification.openFooterToast({ message: 'Licenses unavailable' }));
    }
  }

  onHideUnsafeBoards(): Promise<void> {
    const hidden = {
      ...this.state.get().hidden,
      aco: true,
      c: true,
      cgl: true,
      cm: true,
      d: true,
      e: true,
      gif: true,
      h: true,
      hc: true,
      hm: true,
      i: true,
      mlp: true,
      r: true,
      s: true,
      soc: true,
      u: true,
      y: true,
    };
    return (
      this.database
        .setState(this.state.set({ hidden }).get())
        .then(() => firstValueFrom(this.notification.openFooterToast({ message: 'Boards hidden' })))
        .then(() => void 0)
    );
  }

  onToggleUseThumbnails(event: CustomEvent): Promise<void> {
    return (
      this.database
        .setState(this.state.set({ useThumbnails: event.detail.checked }).get())
        .then(() => void 0)
    );
  }
}

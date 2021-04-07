import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Api } from './services/api.service';
import { ColorScheme } from './services/color-scheme.service';
import { State } from './services/state.service';
import { Storage } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isReady$: Promise<boolean>;

  constructor(
    private api: Api,
    private colorScheme: ColorScheme,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private state: State,
    private storage: Storage,
  ) {
  }

  ngOnInit(): void {
    this.isReady$ = (
      this.platform
        .ready()
        .then(() => this.onSetupStorage())
        .then(() => this.onSetupState())
        .then(() => this.onSetupView())
        .catch(() => this.onReady())
        .then(() => this.onReady())
    );
  }

  onReady(): boolean {
    return true;
  }

  async onSetupStorage(): Promise<void> {
    await this.storage.create();
  }

  async onSetupState(): Promise<void> {
    // Restore the state
    this.state.set(await this.storage.getState());

    // Initialize the boards
    switch (this.state.get().boards.length) {
      case 0:
        const boards = await this.api.getBoards().toPromise();
        await this.storage.setState(this.state.set({ boards }).get());
    }
  }

  onSetupView(): void {
    if (this.state.get().dark) {
      this.colorScheme.setDark();
    } else {
      this.colorScheme.setLight();
    }
    this.splashScreen.hide();
  }
}

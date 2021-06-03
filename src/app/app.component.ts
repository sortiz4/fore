import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Api } from './services/api.service';
import { ColorScheme } from './services/color-scheme.service';
import { SafeArea } from './services/safe-area.service';
import { State } from './services/state.service';
import { Storage } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isReady$: Promise<boolean>;

  get isAndroid(): boolean {
    return this.platform.is('android');
  }

  constructor(
    private api: Api,
    private colorScheme: ColorScheme,
    private platform: Platform,
    private safeArea: SafeArea,
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
        const blocked = Object.fromEntries(boards.map(b => [b.path, false]));
        await this.storage.setState(this.state.set({ blocked, boards }).get());
    }
  }

  async onSetupView(): Promise<void> {
    if (this.isAndroid) {
      const insets = await this.safeArea.getNormalizedSafeAreaInsets();
      document.documentElement.style.setProperty('--ion-safe-area-left', `${insets.top}px`);
      document.documentElement.style.setProperty('--ion-safe-area-right', `${insets.top}px`);
    }

    this.colorScheme.start();
    this.splashScreen.hide();
  }
}

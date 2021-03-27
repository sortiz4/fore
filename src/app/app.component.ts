import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Api } from './services/api.service';
import { State } from './services/state.service';
import { Storage } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isReady$: Promise<boolean>;

  constructor(
    private api: Api,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private state: State,
    private statusBar: StatusBar,
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
    const boards = await this.api.getBoards().toPromise();
    this.state.set({ boards });
  }

  onSetupView(): void {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }
}

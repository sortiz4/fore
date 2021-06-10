import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Api } from './services/api.service';
import { ColorScheme } from './services/color-scheme.service';
import { Database } from './services/database.service';
import { State } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isReady$: Promise<boolean>;

  constructor(
    private api: Api,
    private colorScheme: ColorScheme,
    private database: Database,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private state: State,
  ) {
  }

  ngOnInit(): void {
    this.isReady$ = (
      this.platform
        .ready()
        .then(() => this.onSetupDatabase())
        .then(() => this.onSetupState())
        .then(() => this.onSetupView())
        .catch(() => this.onReady())
        .then(() => this.onReady())
    );
  }

  onReady(): boolean {
    return true;
  }

  async onSetupDatabase(): Promise<void> {
    await this.database.create();
  }

  async onSetupState(): Promise<void> {
    // Restore the state
    this.state.set(await this.database.getState());

    // Initialize the boards
    switch (this.state.get().boards.length) {
      case 0:
        const boards = await this.api.getBoards().toPromise();
        const hidden = Object.fromEntries(boards.map(b => [b.path, false]));
        await this.database.setState(this.state.set({ hidden, boards }).get());
    }
  }

  onSetupView(): void {
    this.colorScheme.start();
    this.splashScreen.hide();
  }
}

import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from './navigation-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SystemUi {
  constructor(private navigationBar: NavigationBar, private statusBar: StatusBar) {
  }

  backgroundColorByHexString(color: string): void {
    this.statusBar.backgroundColorByHexString(color);
    this.navigationBar.backgroundColorByHexString(color);
  }

  backgroundColorByName(color: string): void {
    this.statusBar.backgroundColorByName(color);
    this.navigationBar.backgroundColorByName(color);
  }

  setDark(): void {
    this.setTransparent();
    this.statusBar.styleBlackOpaque();
  }

  setLight(): void {
    this.setTransparent();
    this.statusBar.styleDefault();
  }

  setTransparent(): void {
    this.backgroundColorByHexString('#00000000');
  }

  hide(): void {
    this.statusBar.hide();
    this.navigationBar.hide();
  }

  show(): void {
    this.statusBar.show();
    this.navigationBar.show();
  }
}

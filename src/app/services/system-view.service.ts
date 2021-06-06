import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from './navigation-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SystemView {
  constructor(private navigationBar: NavigationBar, private statusBar: StatusBar) {
  }

  changeBarBackgroundColorByHex(color: string): void {
    this.statusBar.backgroundColorByHexString(color);
    this.navigationBar.backgroundColorByHexString(color);
  }

  changeBarBackgroundColorByName(color: string): void {
    this.statusBar.backgroundColorByName(color);
    this.navigationBar.backgroundColorByName(color);
  }

  changeToDarkTheme(): void {
    const color = getComputedStyle(document.body).getPropertyValue('--ion-background-color').trim();
    this.statusBar.styleBlackOpaque();
    this.changeBarBackgroundColorByHex(color);
  }

  changeToLightTheme(): void {
    this.statusBar.styleDefault();
    this.changeBarBackgroundColorByName('white');
  }

  changeToMediaTheme(): void {
    this.statusBar.styleBlackOpaque();
    this.changeBarBackgroundColorByName('black');
  }

  hideBars(): void {
    this.statusBar.hide();
    this.navigationBar.hide();
  }

  showBars(): void {
    this.statusBar.show();
    this.navigationBar.show();
  }
}

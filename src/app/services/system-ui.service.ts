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
    const color = getComputedStyle(document.body).getPropertyValue('--ion-background-color').trim();
    this.statusBar.styleBlackOpaque();
    this.backgroundColorByHexString(color);
  }

  setLight(): void {
    const color = '#ffffff';
    this.statusBar.styleDefault();
    this.backgroundColorByHexString(color);
  }

  setMedia(): void {
    const color = '#000000';
    this.statusBar.styleBlackOpaque();
    this.backgroundColorByHexString(color);
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

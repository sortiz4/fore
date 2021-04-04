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
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
  }

  backgroundColorByName(color: string): void {
    this.navigationBar.backgroundColorByName(color);
    this.statusBar.backgroundColorByName(color);
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

  setMediaDark(): void {
    const color = '#0c0c0c';
    this.statusBar.styleBlackOpaque();
    this.backgroundColorByHexString(color);
  }

  setMediaLight(): void {
    const color = '#1c1c1c';
    this.statusBar.styleBlackOpaque();
    this.backgroundColorByHexString(color);
  }

  hide(): void {
    this.navigationBar.hide();
    this.statusBar.hide();
  }

  show(): void {
    this.navigationBar.show();
    this.statusBar.show();
  }
}

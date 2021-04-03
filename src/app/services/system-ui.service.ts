import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from './navigation-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SystemUi {
  constructor(private navigationBar: NavigationBar, private statusBar: StatusBar) {
  }

  setDark(): void {
    const color = getComputedStyle(document.body).getPropertyValue('--ion-background-color').trim();
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
    this.statusBar.styleBlackOpaque();
  }

  setLight(): void {
    const color = '#ffffff';
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
    this.statusBar.styleDefault();
  }

  setMediaDark(): void {
    const color = '#f3000000';
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
    this.statusBar.styleBlackOpaque();
  }

  setMediaLight(): void {
    const color = '#d2000000';
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
    this.statusBar.styleBlackOpaque();
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

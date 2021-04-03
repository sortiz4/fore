import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationBar } from './navigation-bar.service';

@Injectable({
  providedIn: 'root',
})
export class SystemUi {
  constructor(private navigationBar: NavigationBar, private statusBar: StatusBar) {
  }

  setLight(): void {
    const color = '#ffffff';
    this.navigationBar.backgroundColorByHexString(color);
    this.statusBar.backgroundColorByHexString(color);
    this.statusBar.styleDefault();
  }

  setDark(): void {
    const color = getComputedStyle(document.body).getPropertyValue('--ion-background-color').trim();
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

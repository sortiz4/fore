import { Injectable } from '@angular/core';
import { IonicNativePlugin } from '@ionic-native/core';
import { Cordova, Plugin } from '../../utils';

@Plugin({
  pluginName: 'NavigationBar',
  plugin: 'cordova-plugin-navigationbar-color',
  pluginRef: 'NavigationBar',
  repo: 'https://github.com/fagundes/cordova-plugin-navigationbar',
  platforms: ['Android'],
})
@Injectable({
  providedIn: 'root',
})
export class NavigationBar extends IonicNativePlugin {
  @Cordova({ sync: true })
  backgroundColorByHexString(colorHex: string, lightNavigationBar?: boolean): void {
    return;
  }

  @Cordova({ sync: true })
  backgroundColorByName(colorName: string, lightNavigationBar?: boolean): void {
    return;
  }

  @Cordova({ sync: true })
  hide(): void {
    return;
  }

  @Cordova({ sync: true })
  show(): void {
    return;
  }
}

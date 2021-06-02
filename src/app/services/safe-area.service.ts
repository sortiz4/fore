import { Injectable } from '@angular/core';
import { IonicNativePlugin } from '@ionic-native/core';
import { Cordova, Plugin } from '../../utils';

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SystemDimensions {
  statusBarHeight: number;
  navigationBarHeight: number;
}

@Plugin({
  pluginName: 'SafeArea',
  plugin: 'cordova-plugin-safe-area',
  pluginRef: 'cordova.plugins.SafeArea',
  repo: 'https://github.com/sortiz4/cordova-plugin-safe-area',
  platforms: ['Android'],
})
@Injectable({
  providedIn: 'root',
})
export class SafeArea extends IonicNativePlugin {
  @Cordova()
  getSafeAreaInsets(): Promise<SafeAreaInsets> {
    return;
  }

  @Cordova()
  getSystemDimensions(): Promise<SystemDimensions> {
    return;
  }
}

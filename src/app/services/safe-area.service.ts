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

function normalizePixelSize(size: number): number {
  return size / globalThis.devicePixelRatio;
}

function normalizeSafeAreaInsets(insets: SafeAreaInsets): SafeAreaInsets {
  return {
    top: normalizePixelSize(insets.top),
    bottom: normalizePixelSize(insets.bottom),
    left: normalizePixelSize(insets.left),
    right: normalizePixelSize(insets.right),
  }
}

function normalizeSystemDimensions(dimensions: SystemDimensions): SystemDimensions {
  return {
    statusBarHeight: normalizePixelSize(dimensions.statusBarHeight),
    navigationBarHeight: normalizePixelSize(dimensions.navigationBarHeight),
  }
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

  getNormalizedSafeAreaInsets(): Promise<SafeAreaInsets> {
    return this.getSafeAreaInsets().then(normalizeSafeAreaInsets);
  }

  getNormalizedSystemDimensions(): Promise<SystemDimensions> {
    return this.getSystemDimensions().then(normalizeSystemDimensions);
  }
}

import { Injectable } from '@angular/core';
import { SystemUi } from './system-ui.service';

@Injectable({
  providedIn: 'root',
})
export class ColorScheme {
  private isMedia = false;
  private readonly color = globalThis.matchMedia('(prefers-color-scheme: dark)');
  private readonly event = (): void => this.synchronize();

  get isDark(): boolean {
    return this.color.matches;
  }

  get isLight(): boolean {
    return !this.isDark;
  }

  constructor(private systemUi: SystemUi) {
  }

  start(): void {
    this.synchronize();
    this.color.addEventListener('change', this.event);
  }

  stop(): void {
    this.color.removeEventListener('change', this.event);
    this.synchronize();
  }

  synchronize(): void {
    if (this.isMedia) {
      this.systemUi.setMedia();
    } else if (this.isLight) {
      this.systemUi.setLight();
    } else {
      this.systemUi.setDark();
    }
  }

  toggleMedia(): void {
    this.isMedia = !this.isMedia;
    this.synchronize();
  }
}

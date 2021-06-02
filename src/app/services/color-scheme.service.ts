import { Injectable } from '@angular/core';
import { SystemUi } from './system-ui.service';

@Injectable({
  providedIn: 'root',
})
export class ColorScheme {
  private isMedia = false;
  private readonly color = globalThis.matchMedia('(prefers-color-scheme: dark)');
  private readonly event = (): void => this.synchronize();

  constructor(private systemUi: SystemUi) {
  }

  isDark(): boolean {
    return this.color.matches;
  }

  isLight(): boolean {
    return !this.isDark();
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
    if (this.isDark()) {
      this.systemUi.setDark();
    } else {
      this.systemUi.setLight();
    }
  }

  toggleMedia(): void {
    this.isMedia = !this.isMedia;

    if (this.isMedia || this.isDark()) {
      this.systemUi.setDark();
    } else {
      this.systemUi.setLight();
    }
  }
}

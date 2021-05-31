import { Injectable } from '@angular/core';
import { SystemUi } from './system-ui.service';

@Injectable({
  providedIn: 'root',
})
export class ColorScheme {
  private isMedia = false;
  private readonly color = globalThis.matchMedia('(prefers-color-scheme: dark)');
  private readonly event = (mediaQuery: MediaQueryListEvent): void => this.toggle(mediaQuery.matches);

  constructor(private systemUi: SystemUi) {
  }

  isDark(): boolean {
    return document.body.classList.contains('dark');
  }

  isLight(): boolean {
    return !this.isDark();
  }

  setDark(): void {
    this.toggle(true);
  }

  setLight(): void {
    this.toggle(false);
  }

  start(): void {
    this.color.addEventListener('change', this.event);
  }

  stop(): void {
    this.color.removeEventListener('change', this.event);
  }

  toggle(force?: boolean): void {
    document.body.classList.toggle('dark', force);

    // Update the system theme accordingly
    if (this.isDark()) {
      this.systemUi.setDark();
    } else {
      this.systemUi.setLight();
    }
  }

  toggleMedia(): void {
    this.isMedia = !this.isMedia;

    if (this.isMedia) {
      if (this.isDark()) {
        this.systemUi.setMediaDark();
      } else {
        this.systemUi.setMediaLight();
      }
    } else {
      if (this.isDark()) {
        this.systemUi.setDark();
      } else {
        this.systemUi.setLight();
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { SystemUi } from './system-ui.service';

@Injectable({
  providedIn: 'root',
})
export class ColorScheme {
  private readonly color = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly event = (mediaQuery: MediaQueryListEvent): void => this.toggle(mediaQuery.matches);
  private isMedia = false;

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
    if (this.isMedia = !this.isMedia) {
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

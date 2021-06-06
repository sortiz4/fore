import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  constructor(private toast: ToastController) {
  }

  openToast(options?: ToastOptions): Observable<HTMLIonToastElement> {
    const defaultOptions = {
      duration: 1000,
    };

    const onSubscribe = (): ObservableInput<HTMLIonToastElement> => {
      return (
        this.toast
          .create({ ...defaultOptions, ...options ?? {} })
          .then(m => m.present().then(() => m))
      );
    };

    return defer(onSubscribe);
  }

  openFooterToast(options?: ToastOptions): Observable<HTMLIonToastElement> {
    return this.openToast({ cssClass: 'app-toast-footer', ...options });
  }
}

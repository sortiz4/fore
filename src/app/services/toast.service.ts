import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  constructor(private toast: ToastController) {
  }

  openToast(options?: ToastOptions): Observable<HTMLIonToastElement> {
    const defaultOptions = {
      duration: 2000,
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
}

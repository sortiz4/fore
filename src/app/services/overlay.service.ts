import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalOptions, ToastOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Overlay {
  constructor(private modal: ModalController, private toast: ToastController) {
  }

  openModal(options: ModalOptions): Observable<HTMLIonModalElement> {
    const onSubscribe = (): ObservableInput<HTMLIonModalElement> => {
      return (
        this.modal
          .create(options)
          .then(m => m.present().then(() => m))
      );
    };

    return defer(onSubscribe);
  }

  openMediaModal(options: Partial<ModalOptions>): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: null,
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };

    return this.openModal({ ...defaultOptions, ...options });
  }

  openPageModal(options: Partial<ModalOptions>): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: null,
      cssClass: 'app-modal-fullscreen',
    };

    return this.openModal({ ...defaultOptions, ...options });
  }

  closeModal(): Observable<boolean> {
    return defer(() => this.modal.dismiss());
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

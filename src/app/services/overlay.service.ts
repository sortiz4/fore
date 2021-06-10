import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Overlay {
  constructor(private modal: ModalController) {
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
}

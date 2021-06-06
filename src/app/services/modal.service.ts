import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  constructor(private window: ModalController) {
  }

  openWindow(options: ModalOptions): Observable<HTMLIonModalElement> {
    const onSubscribe = (): ObservableInput<HTMLIonModalElement> => {
      return (
        this.window
          .create(options)
          .then(m => m.present().then(() => m))
      );
    };

    return defer(onSubscribe);
  }

  closeWindow(): Observable<boolean> {
    return defer(() => this.window.dismiss());
  }
}

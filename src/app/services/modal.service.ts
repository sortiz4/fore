import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalOptions } from '@ionic/core';
import { defer, Observable, ObservableInput } from 'rxjs';
import { SearchComponent } from '../shared/search/search.component';
import { SelectBoardComponent } from '../shared/select-board/select-board.component';
import { ViewMediaComponent } from '../shared/view-media/view-media.component';
import { ViewThreadComponent } from '../shared/view-thread/view-thread.component';

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

  openSearchWindow(options: Partial<ModalOptions>): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: SearchComponent,
      cssClass: 'app-modal-fullscreen',
    };

    return this.openWindow({ ...defaultOptions, ...options });
  }

  openSelectBoardWindow(): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: SelectBoardComponent,
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };

    return this.openWindow(defaultOptions);
  }

  openViewMediaWindow(options: Partial<ModalOptions>): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: ViewMediaComponent,
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };

    return this.openWindow({ ...defaultOptions, ...options });
  }

  openViewThreadWindow(options: Partial<ModalOptions>): Observable<HTMLIonModalElement> {
    const defaultOptions = {
      component: ViewThreadComponent,
      cssClass: 'app-modal-fullscreen',
    };

    return this.openWindow({ ...defaultOptions, ...options });
  }

  closeWindow(): Observable<boolean> {
    return defer(() => this.window.dismiss());
  }
}

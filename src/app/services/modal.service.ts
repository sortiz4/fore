import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { defer, Observable, ObservableInput, of, throwError, zip } from 'rxjs';
import { catchError, finalize, mergeMap } from 'rxjs/operators';

type AlertOptions = Pojo;
type LoadingCallback<T> = () => Observable<T>;
type LoadingOptions = Pojo;
type WindowOptions = any;

class CallbackError {
  constructor(public error: Error) {
  }
}

@Injectable({
  providedIn: 'root',
})
export class Modal {
  constructor(private alert: AlertController, private loading: LoadingController, private window: ModalController) {
  }

  openAlert(options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaultOptions = {
      title: 'Alert',
      buttons: ['Okay'],
    };

    const onSubscribe = (): ObservableInput<HTMLIonAlertElement> => {
      return (
        this.alert
          .create({ ...defaultOptions, ...options ?? {} })
          .then(m => m.present().then(() => m))
      );
    };

    return defer(onSubscribe);
  }

  openErrorAlert(error: Error, options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaultOptions = {
      header: 'Something went wrong.',
      message: 'Please try again.',
    };
    return this.openAlert({ ...defaultOptions, ...options ?? {} });
  }

  openLoad<T>(callback: LoadingCallback<T>, options?: LoadingOptions): Observable<T> {
    const defaultOptions = {
      message: 'Loading...',
    };

    const openModal = (): ObservableInput<HTMLIonLoadingElement> => {
      return (
        this.loading
          .create({ ...defaultOptions, ...options ?? {} })
          .then(m => m.present().then(() => m))
      );
    };

    const onCatch = (error: Error): ObservableInput<CallbackError> => {
      return of(new CallbackError(error));
    };

    const onSubscribe = (): ObservableInput<[HTMLIonLoadingElement, T]> => {
      return zip(openModal(), callback().pipe(catchError(onCatch)));
    };

    const onComplete = ([modal, result]: [HTMLIonLoadingElement, T]): ObservableInput<T> => {
      const next = result instanceof CallbackError ? (
        throwError(result.error)
      ) : (
        of(result)
      );
      return next.pipe(finalize(() => modal.dismiss()));
    };

    return defer(onSubscribe).pipe(mergeMap(onComplete));
  }

  openWindow(options: WindowOptions): Observable<HTMLIonModalElement> {
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

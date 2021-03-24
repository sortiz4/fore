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

  createAlert(options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaultOptions = {
      title: 'Alert',
      buttons: ['Okay'],
    };
    const onSubscribe = (): ObservableInput<HTMLIonAlertElement> => {
      return (
        this.alert
          .create({ ...defaultOptions, ...options ?? {} })
          .then(modal => modal.present().then(() => modal))
      );
    };

    return defer(onSubscribe);
  }

  createErrorAlert(error: Error, options?: AlertOptions): Observable<HTMLIonAlertElement> {
    const defaultOptions = {
      header: 'Something went wrong.',
      message: 'Please try again.',
    };
    return this.createAlert({ ...defaultOptions, ...options ?? {} });
  }

  createLoad<T>(callback: LoadingCallback<T>, options?: LoadingOptions): Observable<T> {
    const defaultOptions = {
      message: 'Loading...',
    };

    const createModal = (): ObservableInput<HTMLIonLoadingElement> => {
      return (
        this.loading
          .create({ ...defaultOptions, ...options ?? {} })
          .then(modal => modal.present().then(() => modal))
      );
    };

    const onCatch = (error: Error): ObservableInput<CallbackError> => {
      return of(new CallbackError(error));
    };

    const onSubscribe = (): ObservableInput<[HTMLIonLoadingElement, T]> => {
      return zip(createModal(), callback().pipe(catchError(onCatch)));
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
          .then(modal => modal.present().then(() => modal))
      );
    };

    return defer(onSubscribe);
  }

  closeWindow(): Observable<boolean> {
    return defer(() => this.window.dismiss());
  }
}

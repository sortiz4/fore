import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage-angular';
import { Store } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  private readonly state = 'state';

  constructor(private storage: IonicStorage) {
  }

  create(): Promise<IonicStorage> {
    return this.storage.create();
  }

  getState(): Promise<Store> {
    return this.storage.get(this.state);
  }

  setState(state: Store): Promise<Store> {
    return this.storage.set(this.state, state);
  }
}

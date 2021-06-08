import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Store } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class Database {
  private readonly state = 'state';

  constructor(private storage: Storage) {
  }

  create(): Promise<Storage> {
    return this.storage.create();
  }

  getState(): Promise<Store> {
    return this.storage.get(this.state);
  }

  setState(state: Store): Promise<Store> {
    return this.storage.set(this.state, state);
  }
}

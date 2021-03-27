import { Injectable } from '@angular/core';
import merge from 'lodash/merge';
import { BehaviorSubject } from 'rxjs';
import { Board } from 'src/models';

export interface Store {
  boards: Board[];
}

function createDefaultStore(): Store {
  return {
    boards: [],
  };
}

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly store$ = new BehaviorSubject<Store>(createDefaultStore());
  readonly changes$ = this.store$.asObservable();

  get(): Store {
    return this.store$.getValue();
  }

  set(update: Partial<Store>): State {
    this.store$.next(merge({}, this.store$.getValue(), update));
    return this;
  }

  reset(): State {
    return this.set(createDefaultStore());
  }
}

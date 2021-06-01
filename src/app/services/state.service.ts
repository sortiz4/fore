import { Injectable } from '@angular/core';
import merge from 'lodash/merge';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../../models';

export interface Store {
  readonly blocked: { [k: string]: boolean };
  readonly boards: Board[];
  readonly dark: boolean;
}

function createDefaultStore(): Store {
  return {
    blocked: {},
    boards: [],
    dark: false,
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

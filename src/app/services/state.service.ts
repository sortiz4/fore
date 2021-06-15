import { Injectable } from '@angular/core';
import merge from 'lodash/merge';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../../models';

export interface Store {
  readonly boards: Board[];
  readonly hidden: { [key: string]: boolean };
  readonly useThumbnails: boolean;
}

function createDefaultStore(): Store {
  return {
    boards: [],
    hidden: {},
    useThumbnails: true,
  };
}

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly store$ = new BehaviorSubject<Store>(createDefaultStore());

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

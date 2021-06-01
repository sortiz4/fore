import { Type } from '@angular/core';
import { cordova, CordovaOptions, PluginConfig } from '@ionic-native/core';
import { AnimeInstance } from 'animejs';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import snakeCase from 'lodash/snakeCase';

function mapKeysForArray(map: (_: string) => string, input: unknown[]): unknown[] {
  const output = [];
  for (const value of input) {
    output.push(mapKeys(map, value));
  }
  return output;
}

function mapKeysForObject(map: (_: string) => string, input: object): object {
  const output = {};
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      output[map(key)] = mapKeys(map, input[key]);
    }
  }
  return output;
}

function mapKeys(map: (_: string) => string, input: unknown): unknown {
  if (isObject(input)) {
    if (isArray(input)) {
      return mapKeysForArray(map, input);
    } else {
      return mapKeysForObject(map, input);
    }
  }
  return input;
}

export function camelCaseKeys(input: unknown): unknown {
  return mapKeys(camelCase, input);
}

export function snakeCaseKeys(input: unknown): unknown {
  return mapKeys(snakeCase, input);
}

export function getTag<T>(component: Type<T>): string {
  return (component as any).ɵcmp.selectors[0][0];
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function observeChildren<T extends Node>(target: T): Promise<T> {
  return new Promise(
    resolve => {
      const observer = new MutationObserver(
        () => {
          observer.disconnect();
          resolve(target);
        },
      );
      observer.observe(target, { childList: true });
    },
  );
}

export function Memoize(): MethodDecorator {
  return (target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    let result = void 0;
    let memoed = false;
    return {
      ...descriptor,
      value(): unknown {
        if (!memoed) {
          result = descriptor.value.apply(this, arguments);
          memoed = true;
        }
        return result;
      },
    };
  };
}

export function Cordova(options?: CordovaOptions): MethodDecorator {
  return (target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    return {
      ...descriptor,
      value(): unknown {
        return cordova(this, key, options, arguments);
      },
    };
  };
}

export function Plugin(options: PluginConfig): ClassDecorator {
  return (target: object): void => {
    Object.assign(target, options);
  };
}

export abstract class AbstractAnimation {
  private workers: AnimeInstance[];

  constructor(protected element: HTMLElement) {
  }

  protected animateBackward(): void {
    if (this.isDirectionForward()) {
      this.changeDirection();
    }
    for (const worker of this.getWorkers()) {
      worker.play();
    }
  }

  protected animateForward(): void {
    if (this.isDirectionBackward()) {
      this.changeDirection();
    }
    for (const worker of this.getWorkers()) {
      worker.play();
    }
  }

  protected changeDirection(): void {
    for (const worker of this.getWorkers()) {
      worker.reverse();
    }
  }

  protected createWorkers(): AnimeInstance[] {
    return [];
  }

  protected getElements(getElements: () => HTMLElement[]): HTMLElement[] {
    return getElements().filter(e => e instanceof HTMLElement);
  }

  protected getWorkers(): AnimeInstance[] {
    this.workers = !this.workers ? this.createWorkers() : this.workers;
    return this.workers;
  }

  protected isDirectionBackward(): boolean {
    return this.getWorkers().some(h => h.reversed);
  }

  protected isDirectionForward(): boolean {
    return !this.isDirectionBackward();
  }
}

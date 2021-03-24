import { Type, ViewChild } from '@angular/core';
import { IonTabs, ViewDidLeave } from '@ionic/angular';
import { cordova, CordovaOptions, PluginConfig } from '@ionic-native/core';
import { StackController } from '@ionic/angular/directives/navigation/stack-controller';
import { RouteView } from '@ionic/angular/directives/navigation/stack-utils';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

function mapKeys(map: (value: string) => string, input: unknown): unknown {
  if (typeof input === 'object' && input !== null) {
    if (input instanceof Array) {
      const output = [];
      for (const value of input) {
        output.push(mapKeys(map, value));
      }
      return output;
    } else {
      const output = {};
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          output[map(key)] = mapKeys(map, input[key]);
        }
      }
      return output;
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

export abstract class TabPatch implements ViewDidLeave {
  @ViewChild(IonTabs) private tabs: IonTabs;
  private readonly view: RouteView = {
    id: -1,
    url: 'void',
    stackId: 'void',
    element: document.createElement('div'),
    ref: {
      injector: null,
      instance: null,
      location: null,
      hostView: null,
      componentType: null,
      changeDetectorRef: {
        detach(): void {},
        reattach(): void {},
        markForCheck(): void {},
        detectChanges(): void {},
        checkNoChanges(): void {},
      },
      destroy(): void {},
      onDestroy(): void {},
    },
    unlistenEvents(): void {},
  };

  private get stack(): StackController {
    return (this.tabs.outlet as any).stackCtrl;
  }

  ionViewDidLeave(): Promise<unknown> {
    return this.stack.setActive(this.view);
  }
}

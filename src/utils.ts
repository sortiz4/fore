import { cordova, CordovaOptions, PluginConfig } from '@ionic-native/core';
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

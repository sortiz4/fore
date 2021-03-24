import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { AngularDelegate } from '@ionic/angular';
import { AngularFrameworkDelegate } from '@ionic/angular/providers/angular-delegate';

type AttachCallback = () => Promise<Element>;
type DetachCallback = (element: Element) => Promise<void>;
type Component<T> = new (...args: unknown[]) => T;
type Properties = { [name: string]: unknown };

export class ComponentHandle {
  private component: Element;

  constructor(private attach: AttachCallback, private detach: DetachCallback) {
  }

  async mount(): Promise<Element> {
    return this.component = await this.attach();
  }

  unmount(): Promise<void> {
    return this.detach(this.component);
  }
}

@Injectable({
  providedIn: 'root',
})
export class Renderer {
  private readonly framework: AngularFrameworkDelegate;

  constructor(private delegate: AngularDelegate, private injector: Injector, private resolver: ComponentFactoryResolver) {
    this.framework = this.delegate.create(this.resolver, this.injector);
  }

  private attach<T>(host: Element, component: Component<T>, properties?: Properties, classes?: string[]): Promise<Element> {
    return this.framework.attachViewToDom(host, component, properties, classes);
  }

  private detach(host: Element, component: Element): Promise<void> {
    return this.framework.removeViewFromDom(host, component);
  }

  createHandle<T>(host: Element, component: Component<T>, properties?: Properties, classes?: string[]): ComponentHandle {
    return new ComponentHandle(
      () => this.attach(host, component, properties, classes),
      element => this.detach(host, element),
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { StackController } from '@ionic/angular/directives/navigation/stack-controller';
import { RouteView, StackEvent } from '@ionic/angular/directives/navigation/stack-utils';
import get from 'lodash/get';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.page.html',
  styleUrls: ['./alpha.page.scss'],
})
export class AlphaPage {
  @ViewChild(IonTabs) tabs: IonTabs;

  ionViewDidLeave(): Promise<StackEvent> {
    const createView = (): RouteView => {
      return {
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
    };

    const getStack = (): StackController => {
      return get(this.tabs.outlet, 'stackCtrl');
    };

    return getStack().setActive(createView());
  }
}

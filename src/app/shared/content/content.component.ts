import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import anime, { AnimeInstance } from 'animejs';
import { defer, fromEvent, Observable, Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { AbstractAnimation, observeChildren } from '../../../utils';

class Animation extends AbstractAnimation {
  protected createWorkers(): AnimeInstance[] {
    const getBottomElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-footer'),
        this.element.closest('ion-tabs')?.querySelector?.('ion-tab-bar'),
        this.element.querySelector('ion-fab'),
      ];
    };

    const getTopElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-header'),
      ];
    };

    const hideOptions = {
      height: 0,
      easing: 'easeInOutSine',
      duration: 250,
      autoplay: false,
    };

    const hideBottomOptions = {
      ...hideOptions,
      targets: this.getElements(getBottomElements),
      translateY: globalThis.innerHeight / 4,
    };

    const hideTopOptions = {
      ...hideOptions,
      targets: this.getElements(getTopElements),
      translateY: -globalThis.innerHeight / 4,
    };

    return [
      anime(hideBottomOptions),
      anime(hideTopOptions),
    ];
  }

  hide(): void {
    this.animateForward();
  }

  show(): void {
    this.animateBackward();
  }
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  @Input() canScrollToTop = false;
  @Output() refresh = new EventEmitter<CustomEvent>();
  @ViewChild(IonContent) content: IonContent;
  private animation: Animation;
  private scrollEvent: Subscription;

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
  }

  constructor(private element: ElementRef) {
  }

  createScrollEvent(): Observable<[number, number]> {
    const filterToSignChange = (): (_: [number, number]) => boolean => {
      let previousX = 0;
      let previousY = 0;

      const mapNumberToSign = (value: number): number => {
        if (value < 0) {
          return -1;
        }
        if (value > 0) {
          return 1;
        }
        return 0;
      };

      return ([newX, newY]: [number, number]): boolean => {
        const result = (
          mapNumberToSign(previousX) !== mapNumberToSign(newX) ||
          mapNumberToSign(previousY) !== mapNumberToSign(newY)
        );
        previousX = newX;
        previousY = newY;
        return result;
      };
    };

    const getScrollParent = (): HTMLElement => {
      return this.element.nativeElement.querySelector('ion-content').shadowRoot;
    };

    const getScrollTarget = (element: HTMLElement): HTMLElement => {
      return element.querySelector('.inner-scroll');
    };

    const getTarget = (): Promise<HTMLElement> => {
      return (
        Promise.resolve()
          .then(getScrollParent)
          .then(observeChildren)
          .then(getScrollTarget)
      );
    };

    const mapScrollEventToDeltas = (): (_: Event) => [number, number] => {
      let previousX = 0;
      let previousY = 0;

      return (event: Event): [number, number] => {
        const deltaX = previousX - (event.target as Element).scrollLeft;
        const deltaY = previousY - (event.target as Element).scrollTop;
        previousX = (event.target as Element).scrollLeft;
        previousY = (event.target as Element).scrollTop;
        return [deltaX, deltaY];
      };
    };

    return (
      defer(getTarget)
        .pipe(concatMap(e => fromEvent(e, 'scroll')))
        .pipe(map(mapScrollEventToDeltas()))
        .pipe(filter(filterToSignChange()))
        .pipe(tap(a => this.onScroll(a)))
    );
  }

  ngOnInit(): void {
    this.animation = new Animation(this.element.nativeElement);
    this.scrollEvent = this.createScrollEvent().subscribe();
  }

  ngOnDestroy(): void {
    this.animation.show();
    this.scrollEvent.unsubscribe();
  }

  onScroll([_, deltaY]: [number, number]): void {
    if (deltaY > 0) {
      this.animation.show();
    } else {
      this.animation.hide();
    }
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

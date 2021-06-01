import { Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Animation as IonicAnimation, createAnimation } from '@ionic/core';
import anime, { AnimeInstance } from 'animejs';
import { defer, fromEvent, Observable, Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { AbstractAnimationIonic, AbstractAnimationAnime, observeChildren } from '../../../utils';

class AnimationAnime extends AbstractAnimationAnime {
  protected createAnimation(): AnimeInstance {
    const getTopElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-header'),
      ];
    };

    const getBottomElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-footer'),
        this.element.closest('ion-tabs')?.querySelector?.('ion-tab-bar'),
        this.element.querySelector('ion-fab'),
      ];
    };

    const hideOptions = {
      height: 0,
      easing: 'easeInOutSine',
      duration: 250,
      autoplay: false,
    };

    const hideTopOptions = {
      ...hideOptions,
      targets: this.getElements(getTopElements),
      translateY: -globalThis.innerHeight / 4,
    };

    const hideBottomOptions = {
      ...hideOptions,
      targets: this.getElements(getBottomElements),
      translateY: globalThis.innerHeight / 4,
    };

    return anime.timeline(hideTopOptions).add(hideBottomOptions, 0);
  }

  hide(): void {
    this.animateForward();
  }

  show(): void {
    this.animateBackward();
  }
}

class Animation extends AbstractAnimationIonic {
  protected createAnimation(): IonicAnimation {
    const getTopElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-header'),
      ];
    };

    const getBottomElements = (): HTMLElement[] => {
      return [
        this.element.closest('.ion-page').querySelector('ion-footer'),
        this.element.closest('ion-tabs')?.querySelector?.('ion-tab-bar'),
        this.element.querySelector('ion-fab'),
      ];
    };

    const hideTopAnimation = (
      createAnimation()
        .addElement(this.getElements(getTopElements))
        .to('transform', `translateY(${-globalThis.innerHeight / 4}px)`)
        .to('height', '0')
    );

    const hideBottomAnimation = (
      createAnimation()
        .addElement(this.getElements(getBottomElements))
        .to('transform', `translateY(${globalThis.innerHeight / 4}px)`)
        .to('height', '0')
    );

    return (
      createAnimation()
        .addAnimation([hideTopAnimation, hideBottomAnimation])
        .duration(250)
        .easing('ease-in-out')
    );
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

  constructor(private element: ElementRef, private zone: NgZone) {
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
    this.zone.runOutsideAngular(() => this.zoneOnInit());
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => this.zoneOnDestroy());
  }

  zoneOnInit(): void {
    this.animation = new Animation(this.element.nativeElement);
    this.scrollEvent = this.createScrollEvent().subscribe();
  }

  zoneOnDestroy(): void {
    this.animation.show();
    this.scrollEvent.unsubscribe();
  }

  onScroll([_, deltaY]: [number, number]): void {
    if (deltaY < 0) {
      this.animation.hide();
    } else {
      this.animation.show();
    }
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonContent, IonRefresher } from '@ionic/angular';
import { Animation as IonicAnimation, createAnimation } from '@ionic/core';
import { defer, fromEvent, Observable, Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { AbstractAnimationIonic, observeChildren } from '../../../utils';

class Animation extends AbstractAnimationIonic {
  private readonly className = 'app-refresher-refreshing';

  private addClasses(): void {
    for (const element of this.getElements()) {
      element.classList.add(this.className);
    }
  }

  private removeClasses(): void {
    for (const element of this.getElements()) {
      element.classList.remove(this.className);
    }
  }

  private rawHide(): Promise<void> {
    return (
      Promise.resolve()
        .then(() => this.animateForward())
        .then(() => this.removeClasses())
        .then(() => this.animateBackward())
      );
  }

  private rawShow(): Promise<void> {
    return (
      Promise.resolve()
      .then(() => this.addClasses())
      .then(() => this.animateBackward())
    );
  }

  private shouldAnimate(): boolean {
    for (const element of this.getElements()) {
      try {
        if (element.closest('ion-refresher').classList.contains('refresher-active')) {
          return false;
        }
      } catch {
      }
    }
    return true;
  }

  protected createAnimation(): IonicAnimation {
    const getElements = (): HTMLElement[] => {
      return [
        this.element.querySelector('ion-refresher .refresher-refreshing'),
      ];
    };

    return (
      createAnimation()
        .addElement(this.filterElements(getElements))
        .to('transform', 'scale(0)')
        .duration(125)
        .easing('ease-in-out')
    );
  }

  async hide(): Promise<void> {
    if (this.shouldAnimate()) {
      await this.rawHide();
    }
  }

  async show(): Promise<void> {
    if (this.shouldAnimate()) {
      await this.rawShow();
    }
  }
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [
    trigger(
      'fab',
      [
        state('true', style({ transform: `translateY(${globalThis.innerHeight / 4}px)` })),
        state('false', style({ transform: 'translateY(0)' })),
        transition('* <=> *', animate('250ms ease-in-out')),
      ],
    ),
  ],
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() canScrollToTop = false;
  @Input() showBack = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<CustomEvent>();
  @Output() save = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonRefresher) refresher: IonRefresher;
  private animation: Animation;
  private scrollEvent: Subscription;
  didScrollDown = true;

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
  }

  get showClose(): boolean {
    return this.close.observers.length > 0;
  }

  get showHeader(): boolean {
    return this.title.length > 0;
  }

  get showMedia(): boolean {
    return this.download.observers.length > 0;
  }

  get showSave(): boolean {
    return this.save.observers.length > 0;
  }

  get showSubmit(): boolean {
    return this.submit.observers.length > 0;
  }

  constructor(private changeDetector: ChangeDetectorRef, private element: ElementRef, private zone: NgZone) {
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
    if (this.canRefresh) {
      this.animation = new Animation(this.element.nativeElement);
    }
    if (this.canScrollToTop) {
      this.scrollEvent = this.createScrollEvent().subscribe();
    }
  }

  zoneOnDestroy(): void {
    if (this.canScrollToTop) {
      this.scrollEvent.unsubscribe();
    }
  }

  onScroll([_, deltaY]: [number, number]): void {
    this.didScrollDown = deltaY < 0;
    this.changeDetector.detectChanges();
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }

  startRefreshing(): Promise<void> {
    return (
      Promise.resolve()
        .then(() => this.refresh.emit())
        .then(() => this.animation.show())
    );
  }

  stopRefreshing(): Promise<void> {
    return (
      this.refresher
        .complete()
        .then(() => this.animation.hide())
    );
  }
}

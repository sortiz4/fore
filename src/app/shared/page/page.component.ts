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
import { defer, fromEvent, Observable, of, Subscription } from 'rxjs';
import { concatMap, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { observeChildren } from '../../../utils';

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
  @Input() canGoBack = false;
  @Input() canScrollToTop = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() copy = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<CustomEvent>();
  @Output() search = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonRefresher) refresher: IonRefresher;
  scrollEvent: Subscription;
  didScrollDown = true;

  get canClose(): boolean {
    return this.close.observers.length > 0;
  }

  get canCopy(): boolean {
    return this.copy.observers.length > 0;
  }

  get canDownload(): boolean {
    return this.download.observers.length > 0;
  }

  get canOpen(): boolean {
    return this.open.observers.length > 0;
  }

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
  }

  get canSearch(): boolean {
    return this.search.observers.length > 0;
  }

  get canShare(): boolean {
    return this.share.observers.length > 0;
  }

  get hasFooter(): boolean {
    return this.hasMedia;
  }

  get hasHeader(): boolean {
    return this.canGoBack || this.canClose || this.hasTitle;
  }

  get hasMedia(): boolean {
    return this.canCopy || this.canDownload || this.canOpen || this.canShare;
  }

  get hasTitle(): boolean {
    return this.title.length > 0;
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

  doSafeRefresh<T>(callback: () => Observable<T>): Observable<T> {
    const onStart = (): void => {
      this.refresher.disabled = true;
    };

    const onStop = async (): Promise<void> => {
      await this.refresher.complete();
      this.refresher.disabled = false;
    };

    return (
      of(true)
        .pipe(tap(onStart))
        .pipe(switchMap(callback))
        .pipe(finalize(onStop))
    );
  }
}

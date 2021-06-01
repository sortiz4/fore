import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { defer, fromEvent, Observable, Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { observeChildren } from '../../../utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
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
export class ContentComponent implements OnInit, OnDestroy {
  @Input() canScrollToTop = false;
  @Output() refresh = new EventEmitter<CustomEvent>();
  @ViewChild(IonContent) content: IonContent;
  private scrollEvent: Subscription;
  didScrollDown = true;

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
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
    this.scrollEvent = this.createScrollEvent().subscribe();
  }

  zoneOnDestroy(): void {
    this.scrollEvent.unsubscribe();
  }

  onScroll([_, deltaY]: [number, number]): void {
    this.didScrollDown = deltaY < 0;
    this.changeDetector.detectChanges();
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

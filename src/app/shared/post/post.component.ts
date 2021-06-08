import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Post } from '../../../models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements AfterViewInit, OnDestroy {
  @Input() post: Post;
  linkEvents: Subscription[];

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => this.zoneAfterViewInit());
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => this.zoneOnDestroy());
  }

  zoneAfterViewInit(): void {
    const getContent = (): HTMLIonContentElement => {
      return this.element.nativeElement.closest('ion-content');
    };

    const getQuoteLinks = (): HTMLAnchorElement[] => {
      return Array.from(this.element.nativeElement.querySelector('ion-card-content')?.querySelectorAll?.('a') ?? []);
    };

    const getScrollTarget = (selector: string): HTMLElement => {
      return content.querySelector(selector);
    };

    const onClick = async (event: MouseEvent): Promise<void> => {
      event.preventDefault();
      const reference = (event.target as HTMLAnchorElement).href ?? '';
      const matches = reference.match(/#p\d+$/) ?? [];
      const target = getScrollTarget(matches[0]);
      if (target) {
        await content.scrollToPoint(target.offsetLeft, target.offsetTop, 250);
      }
    };

    const content = getContent();

    this.linkEvents = getQuoteLinks().map(e => fromEvent(e, 'click').subscribe(onClick));
  }

  zoneOnDestroy(): void {
    for (const linkEvent of this.linkEvents) {
      linkEvent.unsubscribe();
    }
    this.linkEvents = void 0;
  }
}

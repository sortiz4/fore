import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewMediaComponent } from '../view-media/view-media.component';
import { Modal } from '../../services/modal.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit, OnDestroy {
  @Input() isImage: boolean;
  @Input() isVideo: boolean;
  @Input() media: string;
  @Input() name: string;
  isVisible: boolean;
  observer: IntersectionObserver;

  constructor(private element: ElementRef, private modal: Modal) {
  }

  ngOnInit(): void {
    this.startObserver();
  }

  ngOnDestroy(): void {
    this.stopObserver();
  }

  startObserver(): void {
    const callback = ([entry]: IntersectionObserverEntry[]): void => {
      if (!this.isVisible) {
        this.isVisible = entry.isIntersecting;
      }
    };

    const options = {
      root: this.element.nativeElement.closest('ion-content').shadowRoot.querySelector('main'),
      rootMargin: `${globalThis.innerHeight}px`,
      threshold: 1,
    };

    this.observer = new IntersectionObserver(callback, options);
    this.observer.observe(this.element.nativeElement);
  }

  stopObserver(): void {
    this.observer.disconnect();
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent): Promise<HTMLIonModalElement> {
    event.stopImmediatePropagation();
    const options = {
      component: ViewMediaComponent,
      componentProps: {
        isImage: this.isImage,
        isVideo: this.isVideo,
        media: this.media,
        name: this.name,
      },
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };
    return this.modal.openWindow(options).toPromise();
  }
}

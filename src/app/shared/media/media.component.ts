import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewMediaComponent } from '../view-media/view-media.component';
import { Modal } from '../../services/modal.service';
import { FileType } from '../../../models';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() type: FileType;
  @Input() url: string;
  isVisible: boolean;
  observer: IntersectionObserver;

  get isImage(): boolean {
    return this.type === FileType.Image;
  }

  get isVideo(): boolean {
    return this.type === FileType.Video;
  }

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
      root: this.element.nativeElement.closest('ion-content').shadowRoot.querySelector('.inner-scroll'),
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
        name: this.name,
        type: this.type,
        url: this.url,
      },
      cssClass: [
        'app-modal-fullscreen',
        'app-modal-lightbox',
      ],
    };
    return this.modal.openWindow(options).toPromise();
  }
}

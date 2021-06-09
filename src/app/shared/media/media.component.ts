import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
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

  constructor(private changeDetector: ChangeDetectorRef, private element: ElementRef, private modal: Modal, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => this.startObserver());
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => this.stopObserver());
  }

  startObserver(): void {
    const callback = ([entry]: IntersectionObserverEntry[]): void => {
      this.isVisible = entry.isIntersecting;

      if (this.isVisible) {
        this.observer.disconnect();
        this.changeDetector.detectChanges();
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
      componentProps: {
        name: this.name,
        type: this.type,
        url: this.url,
      },
    };
    return this.modal.openViewMediaWindow(options).toPromise();
  }
}

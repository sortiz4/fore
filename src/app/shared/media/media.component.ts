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
import { timer } from 'rxjs';
import { ViewMediaComponent } from '../view-media/view-media.component';
import { Modal } from '../../services/modal.service';
import { State } from '../../services/state.service';
import { Content, FileType } from '../../../models';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit, OnDestroy {
  @Input() content: Content;
  isVisible: boolean;
  observer: IntersectionObserver;

  get name(): string {
    return this.content.fileName;
  }

  get poster(): string {
    return this.content.fileThumbnailUrl
  }

  get type(): FileType {
    if (this.useThumbnails) {
      return FileType.Image;
    }
    return this.content.fileType;
  }

  get url(): string {
    if (this.useThumbnails) {
      return this.content.fileThumbnailUrl;
    }
    return this.content.fileUrl;
  }

  get isImage(): boolean {
    return this.type === FileType.Image;
  }

  get isVideo(): boolean {
    return this.type === FileType.Video;
  }

  get useThumbnails(): boolean {
    return this.state.get().useThumbnails;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private modal: Modal,
    private state: State,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => this.startObserver());
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => this.stopObserver());
  }

  async startObserver(): Promise<void> {
    const getTarget = (): HTMLElement => {
      return this.element.nativeElement.closest('ion-content').shadowRoot.querySelector('.inner-scroll');
    };

    const onIntersect = ([entry]: IntersectionObserverEntry[]): void => {
      this.isVisible = entry.isIntersecting;

      if (this.isVisible) {
        this.observer.disconnect();
        this.changeDetector.detectChanges();
      }
    };

    const options = {
      root: await timer(0).toPromise().then(getTarget),
      rootMargin: `${globalThis.innerHeight}px`,
      threshold: 1,
    };

    this.observer = new IntersectionObserver(onIntersect, options);
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
        name: this.content.fileName,
        type: this.content.fileType,
        url: this.content.fileUrl,
      },
    };
    return this.modal.openLightboxWindow(options).toPromise();
  }
}

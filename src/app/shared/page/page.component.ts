import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements AfterViewInit, OnDestroy {
  @Input() canScrollToTop = false;
  @Input() showBack = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @Output() download = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<CustomEvent>();
  @Output() save = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @ViewChild(ContentComponent) content: ContentComponent;
  private contentRefreshEvent: Subscription;

  get canRefresh(): boolean {
    return this.refresh.observers.length > 0;
  }

  get showClose(): boolean {
    return this.close.observers.length > 0;
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

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    if (this.canRefresh) {
      this.contentRefreshEvent = this.content.refresh.subscribe(e => this.refresh.emit(e));
      this.changeDetector.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.canRefresh) {
      this.contentRefreshEvent.unsubscribe();
    }
  }
}

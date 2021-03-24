import { Directive, ElementRef, OnInit } from '@angular/core';
import { observeChildren } from '../../utils';

@Directive({
  selector: 'ion-segment, [appNoRipple]',
})
export class NoRippleDirective implements OnInit {
  constructor(private element: ElementRef) {
  }

  ngOnInit(): Promise<void> {
    switch (this.element.nativeElement.tagName) {
      case 'ION-SEGMENT':
        return this.mutateIonSegment();
    }
  }

  mutateIonSegment(): Promise<void> {
    const children = [...this.element.nativeElement.children] as HTMLIonSegmentButtonElement[];
    return (
      Promise.resolve(children)
        .then(a => Promise.all(a.map(b => observeChildren(b.shadowRoot))))
        .then(a => a.forEach(b => b.querySelectorAll('ion-ripple-effect').forEach(c => c.remove())))
    );
  }
}

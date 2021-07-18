import { TestBed } from '@angular/core/testing';
import { Overlay } from './overlay.service';

describe('Overlay', () => {
  let service: Overlay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Overlay);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

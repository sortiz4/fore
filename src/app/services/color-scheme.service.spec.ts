import { TestBed } from '@angular/core/testing';
import { ColorScheme } from './color-scheme.service';

describe('ColorScheme', () => {
  let service: ColorScheme;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorScheme);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

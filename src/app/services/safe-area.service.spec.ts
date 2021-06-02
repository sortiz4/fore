import { TestBed } from '@angular/core/testing';
import { SafeArea } from './safe-area.service';

describe('SafeArea', () => {
  let service: SafeArea;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeArea);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

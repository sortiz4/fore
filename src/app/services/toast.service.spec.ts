import { TestBed } from '@angular/core/testing';
import { Toast } from './toast.service';

describe('Toast', () => {
  let service: Toast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { SystemUi } from './system-ui.service';

describe('SystemUi', () => {
  let service: SystemUi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemUi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

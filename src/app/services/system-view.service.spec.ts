import { TestBed } from '@angular/core/testing';
import { SystemView } from './system-view.service';

describe('SystemView', () => {
  let service: SystemView;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemView);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

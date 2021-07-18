import { TestBed } from '@angular/core/testing';
import { NavigationBar } from './navigation-bar.service';

describe('NavigationBar', () => {
  let service: NavigationBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationBar);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

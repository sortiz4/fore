import { TestBed } from '@angular/core/testing';
import { SnakeCase } from './snake-case.service';

describe('SnakeCase', () => {
  let service: SnakeCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeCase);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

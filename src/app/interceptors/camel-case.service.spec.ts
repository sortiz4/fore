import { TestBed } from '@angular/core/testing';
import { CamelCase } from './camel-case.service';

describe('CamelCase', () => {
  let service: CamelCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamelCase);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

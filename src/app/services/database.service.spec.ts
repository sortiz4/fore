import { TestBed } from '@angular/core/testing';
import { Database } from './database.service';

describe('Database', () => {
  let service: Database;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Database);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

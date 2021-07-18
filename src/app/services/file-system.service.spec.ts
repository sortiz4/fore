import { TestBed } from '@angular/core/testing';
import { FileSystem } from './file-system.service';

describe('FileSystem', () => {
  let service: FileSystem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSystem);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});

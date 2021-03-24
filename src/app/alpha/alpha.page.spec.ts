import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlphaPage } from './alpha.page';

describe('AlphaPage', () => {
  let component: AlphaPage;
  let fixture: ComponentFixture<AlphaPage>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        AlphaPage,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

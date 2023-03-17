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
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(AlphaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

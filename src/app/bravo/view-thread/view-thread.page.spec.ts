import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViewThreadPage } from './view-thread.page';

describe('ViewThreadPage', () => {
  let component: ViewThreadPage;
  let fixture: ComponentFixture<ViewThreadPage>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        ViewThreadPage,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(ViewThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

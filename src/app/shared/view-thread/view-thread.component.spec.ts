import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViewThreadComponent } from './view-thread.component';

describe('ViewThreadComponent', () => {
  let component: ViewThreadComponent;
  let fixture: ComponentFixture<ViewThreadComponent>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        ViewThreadComponent,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(ViewThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

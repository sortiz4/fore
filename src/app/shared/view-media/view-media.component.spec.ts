import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViewMediaComponent } from './view-media.component';

describe('ViewMediaComponent', () => {
  let component: ViewMediaComponent;
  let fixture: ComponentFixture<ViewMediaComponent>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        ViewMediaComponent,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(ViewMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

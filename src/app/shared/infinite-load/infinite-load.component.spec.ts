import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { InfiniteLoadComponent } from './infinite-load.component';

describe('InfiniteLoadComponent', () => {
  let component: InfiniteLoadComponent;
  let fixture: ComponentFixture<InfiniteLoadComponent>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        InfiniteLoadComponent,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(InfiniteLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

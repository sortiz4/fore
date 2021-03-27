import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SelectBoardComponent } from './select-board.component';

describe('SelectBoardComponent', () => {
  let component: SelectBoardComponent;
  let fixture: ComponentFixture<SelectBoardComponent>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        SelectBoardComponent,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(SelectBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

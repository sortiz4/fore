import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BoardsPage } from './boards.page';

describe('BoardsPage', () => {
  let component: BoardsPage;
  let fixture: ComponentFixture<BoardsPage>;

  beforeEach(waitForAsync(() => {
    const config = {
      declarations: [
        BoardsPage,
      ],
      imports: [
        IonicModule.forRoot(),
      ],
    };
    TestBed.configureTestingModule(config).compileComponents();

    fixture = TestBed.createComponent(BoardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

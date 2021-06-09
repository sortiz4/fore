import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { TimeAgoPipe } from './time-ago.pipe';
import { BoardComponent } from './board/board.component';
import { MediaComponent } from './media/media.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { SearchBoardsPipe } from './search-boards.pipe';
import { SearchComponent } from './search/search.component';
import { SelectBoardComponent } from './select-board/select-board.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ThreadComponent } from './thread/thread.component';
import { ViewMediaComponent } from './view-media/view-media.component';
import { ViewThreadComponent } from './view-thread/view-thread.component';

@NgModule({
  declarations: [
    BoardComponent,
    MediaComponent,
    PageComponent,
    PostComponent,
    SearchBoardsPipe,
    SearchComponent,
    SelectBoardComponent,
    SpinnerComponent,
    ThreadComponent,
    TimeAgoPipe,
    ViewMediaComponent,
    ViewThreadComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PinchZoomModule,
    RouterModule,
  ],
  exports: [
    BoardComponent,
    MediaComponent,
    PageComponent,
    PostComponent,
    SearchBoardsPipe,
    SearchComponent,
    SelectBoardComponent,
    SpinnerComponent,
    ThreadComponent,
    TimeAgoPipe,
    ViewMediaComponent,
    ViewThreadComponent,
  ],
})
export class SharedModule {}

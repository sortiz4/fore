import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { NoRippleDirective } from './no-ripple.directive';
import { TimeAgoPipe } from './time-ago.pipe';
import { BoardComponent } from './board/board.component';
import { ContentComponent } from './content/content.component';
import { InfiniteLoadComponent } from './infinite-load/infinite-load.component';
import { MediaComponent } from './media/media.component';
import { NotificationComponent } from './notification/notification.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { SearchBoardsPipe } from './search-boards.pipe';
import { SelectBoardComponent } from './select-board/select-board.component';
import { ThreadComponent } from './thread/thread.component';
import { ViewMediaComponent } from './view-media/view-media.component';
import { ViewThreadComponent } from './view-thread/view-thread.component';

@NgModule({
  declarations: [
    BoardComponent,
    ContentComponent,
    InfiniteLoadComponent,
    MediaComponent,
    NoRippleDirective,
    NotificationComponent,
    PageComponent,
    PostComponent,
    SearchBoardsPipe,
    SelectBoardComponent,
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
    ContentComponent,
    InfiniteLoadComponent,
    MediaComponent,
    NoRippleDirective,
    NotificationComponent,
    PageComponent,
    PostComponent,
    SearchBoardsPipe,
    SelectBoardComponent,
    ThreadComponent,
    TimeAgoPipe,
    ViewMediaComponent,
    ViewThreadComponent,
  ],
})
export class SharedModule {}

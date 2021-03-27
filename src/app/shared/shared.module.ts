import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NoRippleDirective } from './no-ripple.directive';
import { TimeAgoPipe } from './time-ago.pipe';
import { BoardComponent } from './board/board.component';
import { InfiniteLoadComponent } from './infinite-load/infinite-load.component';
import { NotificationComponent } from './notification/notification.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
import { ThreadComponent } from './thread/thread.component';

@NgModule({
  declarations: [
    BoardComponent,
    InfiniteLoadComponent,
    NoRippleDirective,
    NotificationComponent,
    PageComponent,
    PostComponent,
    ThreadComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    BoardComponent,
    InfiniteLoadComponent,
    NoRippleDirective,
    NotificationComponent,
    PageComponent,
    PostComponent,
    ThreadComponent,
    TimeAgoPipe,
  ],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BookmarksPage } from './bookmarks.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BookmarksPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: BookmarksPage }]),
    SharedModule,
  ],
})
export class BookmarksPageModule {}

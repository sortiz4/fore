import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BoardsPage } from './boards.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BoardsPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: BoardsPage }]),
    SharedModule,
  ],
})
export class BoardsPageModule {}

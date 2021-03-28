import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewThreadPage } from './view-thread.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ViewThreadPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ViewThreadPage }]),
    SharedModule,
  ],
})
export class ViewThreadPageModule {}

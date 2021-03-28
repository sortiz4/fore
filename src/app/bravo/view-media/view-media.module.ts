import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewMediaPage } from './view-media.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ViewMediaPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ViewMediaPage }]),
    SharedModule,
  ],
})
export class ViewMediaPageModule {}

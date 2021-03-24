import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    NotificationsPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: NotificationsPage }]),
    SharedModule,
  ],
})
export class NotificationsPageModule {}

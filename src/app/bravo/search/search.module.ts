import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SearchPage }]),
    SharedModule,
  ],
})
export class SearchPageModule {}

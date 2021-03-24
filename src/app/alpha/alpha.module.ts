import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlphaPage } from './alpha.page';

const routes: Routes = [
  {
    path: '',
    component: AlphaPage,
    children: [
      {
        path: 'bookmarks',
        loadChildren: () => import('./bookmarks/bookmarks.module').then(m => m.BookmarksPageModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    AlphaPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class AlphaPageModule {}

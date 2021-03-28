import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'boards',
    loadChildren: () => import('./boards/boards.module').then(m => m.BoardsPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
  },
  {
    path: 'view-media',
    loadChildren: () => import('./view-media/view-media.module').then(m => m.ViewMediaPageModule),
  },
  {
    path: 'view-thread',
    loadChildren: () => import('./view-thread/view-thread.module').then(m => m.ViewThreadPageModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class BravoPageModule {}

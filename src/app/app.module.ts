import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AngularDelegate, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { CamelCase } from './interceptors/camel-case.service';
import { SnakeCase } from './interceptors/snake-case.service';

const routes: Routes = [
  {
    path: 'a',
    loadChildren: () => import('./alpha/alpha.module').then(m => m.AlphaPageModule),
  },
  {
    path: 'b',
    loadChildren: () => import('./bravo/bravo.module').then(m => m.BravoPageModule),
  },
  {
    path: '',
    redirectTo: '/a/home',
    pathMatch: 'full',
  },
];

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    AngularDelegate,
    FileTransfer,
    SplashScreen,
    StatusBar,
    { provide: HTTP_INTERCEPTORS, useClass: CamelCase, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnakeCase, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
})
export class AppModule {}

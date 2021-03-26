import { Component, ViewChild } from '@angular/core';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Api } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  @ViewChild(IonContent) content: IonContent;
  board: string;
  catalog$: Observable<unknown>;

  constructor(private api: Api) {
  }

  ionViewWillEnter(): void {
    if (!this.board) {
      this.board = 'tv';
    }
    if (!this.catalog$) {
      this.catalog$ = this.api.getCatalog(this.board);
    }
  }

  onScrollToTop(): Promise<void> {
    return this.content.scrollToTop(250);
  }
}

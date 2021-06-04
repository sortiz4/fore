import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  posts = this.createPosts();

  constructor(private navigation: NavController) {
  }

  createPosts(): boolean[] {
    return Array(5).fill(0).map(Boolean);
  }

  onCancel(): void {
    return this.navigation.back();
  }
}

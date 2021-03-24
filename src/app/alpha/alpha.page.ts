import { Component } from '@angular/core';
import { TabPatch } from '../../utils';

@Component({
  selector: 'app-alpha',
  templateUrl: 'alpha.page.html',
  styleUrls: ['alpha.page.scss'],
})
export class AlphaPage extends TabPatch {
  onPost(): Promise<void> {
    return Promise.resolve();
  }
}

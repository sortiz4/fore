import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): unknown {
    return browser.get('/');
  }

  getPageTitle(): unknown {
    return element(by.css('ion-title')).getText();
  }
}

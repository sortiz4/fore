import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<void> {
    return await browser.get('/');
  }

  async getPageTitle(): Promise<string> {
    return await element(by.css('ion-title')).getText();
  }
}

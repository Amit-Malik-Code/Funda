import { Page, Locator } from '@playwright/test'

export class CookieConsentModel {
  page: Page;
  rejectAllCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rejectAllCookiesButton = page.getByLabel('Disagree and close: Disagree');
  };
}
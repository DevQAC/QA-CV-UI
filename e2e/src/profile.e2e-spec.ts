import { AppPage } from './po/app.po';
import { browser, logging, ElementFinder } from 'protractor';

describe('Profile', () => {
  let page: AppPage;
  let profileInputElement: ElementFinder;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    profileInputElement = page.getProfileInputElement();
  });

  it('should appear on the page', () => {
    expect(profileInputElement.isPresent()).toBeTruthy();
  });

  it('should allow user input', () => {
    const inputString = page.randomString(128);
    expect(profileInputElement.getAttribute('value')).toEqual('');
    profileInputElement.sendKeys(inputString);
    expect(profileInputElement.getAttribute('value')).toEqual(inputString);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

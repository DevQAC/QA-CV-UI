import { AppPage } from './po/app.po';
import { browser, logging, ElementFinder } from 'protractor';

describe('Hobbies', () => {
  let page: AppPage;
  let hobbiesInputElement: ElementFinder;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    hobbiesInputElement = page.getHobbiesInputElement();
  });

  it('should appear on the page', () => {
    expect(hobbiesInputElement.isPresent()).toBeTruthy();
  });

  it('should allow user input', () => {
    const inputString = page.randomString(128);
    expect(hobbiesInputElement.getAttribute('value')).toEqual('');
    hobbiesInputElement.sendKeys(inputString);
    expect(hobbiesInputElement.getAttribute('value')).toEqual(inputString);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

import { AppPage } from './po/app.po';
import { browser, logging, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should enter data into all fields', async () => {
    page.navigateTo();
    page.getProfileInputElement().sendKeys(page.randomString(256));
    // page.getProgrammingLanguagesInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getIDEsInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getOperatingSystemsInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getDevopsInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getDatabasesInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getPlatformsInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    // page.getOtherInputElement().sendKeys(page.randomString(12), protractor.Key.ENTER, page.randomString(12), protractor.Key.ENTER);
    page.getNewQualificationButtonElement().click();
    page.getNewQualificationButtonElement().click();
    page.getNewQualificationButtonElement().click();
    browser.waitForAngular();



    // browser.sleep(0);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

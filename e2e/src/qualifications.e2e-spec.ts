import { AppPage } from './po/app.po';
import { browser, logging } from 'protractor';

describe('Qualifications', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should add a qualification when the button is clicked', () => {
    const qualiInputEl = page.getQualificationDetailsInput(0);
    const inputString = page.randomString(16);

    page.getNewQualificationButtonElement().click();
    browser.waitForAngular();
    expect(qualiInputEl.isPresent()).toBeTruthy();
    expect(qualiInputEl.getAttribute('value')).toEqual(''); // Input should start empty
    qualiInputEl.sendKeys(inputString);
    expect(qualiInputEl.getAttribute('value')).toEqual(inputString);
  });

  it('should add a multiple qualifications when the button is clicked', () => {
    for (let i = 0; i < 3; i++) {
      const inputString = page.randomString(16);
      const qualiInputEl = page.getQualificationDetailsInput(i);
      page.getNewQualificationButtonElement().click();
      browser.waitForAngular();
      expect(qualiInputEl.isPresent()).toBeTruthy();
      expect(qualiInputEl.getAttribute('value')).toEqual(''); // Input should start empty
      qualiInputEl.sendKeys(inputString);
      expect(qualiInputEl.getAttribute('value')).toEqual(inputString);
    }
  });

  it('should not allow more than three qualifications to be created', () => {
    const newQualiButton = page.getNewQualificationButtonElement();

    for (let i = 0; i < 10; i++) {
      page.getNewQualificationButtonElement().click();
      browser.waitForAngular();
      if (i > 2) { // More than 3 qualifications
        expect(page.getQualificationDetailsInput(i).isPresent()).toBeFalsy(`input with index ${i} should not be present on the page`);
        expect(newQualiButton.isEnabled()).toBeFalsy(`button should not be enabled for index ${i}`);
      } else { // 3 or less qualifications
        expect(page.getQualificationDetailsInput(i).isPresent()).toBeTruthy(`input with index ${i} should be present on the page`);
        if (i === 2) { // Exactly 3 qualifications
          expect(newQualiButton.isEnabled()).toBeFalsy(`button should not be enabled for index ${i}`);
        } else {
          expect(newQualiButton.isEnabled()).toBeTruthy(`button should be enabled for index ${i}`);
        }
      }
    }
  });

  it('should remove a created qualification', () => {
    const qualiInputEl = page.getQualificationDetailsInput(0);
    const qualiRemoveEl = page.getQualificationRemoveButton(0);
    page.getNewQualificationButtonElement().click();
    browser.waitForAngular();
    expect(qualiInputEl.isPresent()).toBeTruthy();
    qualiRemoveEl.click();
    browser.waitForAngular();
    expect(qualiInputEl.isPresent()).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

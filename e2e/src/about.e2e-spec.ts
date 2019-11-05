import { AppPage } from './po/app.po';
import { browser, logging, ElementFinder } from 'protractor';

describe('About', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  describe('First name input', () => {
    let firstNameInputElement: ElementFinder;

    beforeEach(() => {
      firstNameInputElement = page.getFirstNameInputElement();
    });

    it('should appear on the page', () => {
      expect(firstNameInputElement.isPresent()).toBeTruthy();
    });

    it('should allow user input', () => {
      const inputString = page.randomString(64);
      expect(firstNameInputElement.getAttribute('value')).toEqual('');
      firstNameInputElement.sendKeys(inputString);
      expect(firstNameInputElement.getAttribute('value')).toEqual(inputString);
    });
  });

  describe('Surname input', () => {
    let surnameInputElement: ElementFinder;

    beforeEach(() => {
      surnameInputElement = page.getSurnameInputElement();
    });

    it('should appear on the page', () => {
      expect(surnameInputElement.isPresent()).toBeTruthy();
    });

    it('should allow user input', () => {
      const inputString = page.randomString(64);
      expect(surnameInputElement.getAttribute('value')).toEqual('');
      surnameInputElement.sendKeys(inputString);
      expect(surnameInputElement.getAttribute('value')).toEqual(inputString);
    });
  });

  describe('Source Control Link input', () => {
    let sourceControlLinkInputElement: ElementFinder;

    beforeEach(() => {
      sourceControlLinkInputElement = page.getSourceControlLinkInputElement();
    });

    it('should appear on the page', () => {
      expect(sourceControlLinkInputElement.isPresent()).toBeTruthy();
    });

    it('should allow user input', () => {
      const inputString = page.randomString(64);
      expect(sourceControlLinkInputElement.getAttribute('value')).toEqual('');
      sourceControlLinkInputElement.sendKeys(inputString);
      expect(sourceControlLinkInputElement.getAttribute('value')).toEqual(inputString);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

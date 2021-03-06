import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getFirstNameInputElement() {
    return element(by.name('first-name-input'));
  }

  getSurnameInputElement() {
    return element(by.name('surname-input'));
  }

  getSourceControlLinkInputElement() {
    return element(by.name('source-control-link-input'));
  }

  getProfileInputElement() {
    return element(by.name('profile-input'));
  }

  getNewQualificationButtonElement() {
    return element(by.name('new-qualification-button'));
  }

  getNewWorkExperienceButtonElement() {
    return element(by.name('new-work-experience-button'));
  }

  getQualificationDetailsInput(index) {
    return element(by.xpath(`//app-qualifications/table/tbody/tr[${index + 1}]//input`));
  }
  getQualificationRemoveButton(index) {
    return element(by.xpath(`//app-qualifications/table/tbody/tr[${index + 1}]//button`));
  }

  getAllQualificationRows() {
    return element.all(by.xpath('//app-qualifications/table/tbody/tr'));
  }

  getHobbiesInputElement() {
    return element(by.name('hobbies-input'));
  }

  randomString(length = 64) {
    return [...Array(length)].map(i => (~~(Math.random() * 36)).toString(36)).join('');
  }
}

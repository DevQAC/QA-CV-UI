import { AppPage } from './po/app.po';
import { browser, logging, ElementFinder, protractor, ElementArrayFinder } from 'protractor';
import { SkillsControl } from './po/skills.po';

describe('Skills', () => {
  let page: AppPage;
  let skills: SkillsControl;


  beforeEach(() => {
    page = new AppPage();
    skills = new SkillsControl();
    page.navigateTo();
  });

  [
    { label: 'Programming Languages', key: 'programmingLanguages' },
    { label: 'IDEs', key: 'ides' },
    { label: 'Operating Systems', key: 'operatingSystems' },
    { label: 'Devops', key: 'devops' },
    { label: 'Databases', key: 'databases' },
    { label: 'Platforms', key: 'platforms' },
    { label: 'Other', key: 'other' }
  ].forEach(skill => {
    describe(skill.label, () => {
      let skillInputEl: ElementFinder;
      let skillChipEls: ElementArrayFinder;

      beforeEach(() => {
        skillInputEl = skills.getInputElByName(skill.key);
        skillChipEls = skills.getSkillChipsByName(skill.key);
      });

      it('should appear on the page', () => {
        expect(skillInputEl.isPresent()).toBeTruthy();
      });

      it('should allow user input', () => {
        const inputString = page.randomString(32);
        expect(skillInputEl.getAttribute('value')).toEqual('');
        skillInputEl.sendKeys(inputString);
        expect(skillInputEl.getAttribute('value')).toEqual(inputString);
      });
      it('should create chips from user input', () => {
        for (let i = 0; i < 10; i++) {
          const inputString = page.randomString(32);
          skillInputEl.sendKeys(inputString, protractor.Key.ENTER);
          expect(skillInputEl.getAttribute('value')).toEqual(''); // Should clear input after ENTER
          expect(skillChipEls.count()).toEqual(i + 1);
        }
      });
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

import { by, element } from 'protractor';

export class SkillsControl {

  getInputElByName(skill) {
    return element(by.name(skill + '-skill-input'));
  }

  getSkillChipsByName(skill) {
    return element.all(by.xpath(`//*[@name="${skill}-chip-list"]/div/mat-chip`));
  }
}

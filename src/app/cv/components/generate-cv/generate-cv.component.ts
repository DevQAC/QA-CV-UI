import { Component, OnInit } from '@angular/core';
import { CvRemoteService } from '../../_common/services/cv-remote.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CvModel } from '../../_common/models/cv.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as _ from 'lodash';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-generate-cv',
  templateUrl: './generate-cv.component.html',
  styleUrls: ['./generate-cv.component.scss']
})
export class GenerateCvComponent implements OnInit {

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public skillCategories = [
    {
      label: 'Programming Languages',
      key: 'programmingLanguages'
    },
    {
      label: 'IDEs',
      key: 'ides'
    },
    {
      label: 'Operating Systems',
      key: 'operatingSystems'
    },
    {
      label: 'Devops',
      key: 'devops'
    },
    {
      label: 'Databases',
      key: 'databases'
    },
    {
      label: 'Platforms',
      key: 'platforms'
    },
    {
      label: 'Other',
      key: 'other'
    },
  ];

  public cvForm: FormGroup;

  constructor(private cvRemoteService: CvRemoteService) {

    const fb = new FormBuilder();

    this.cvForm = fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      profile: fb.group({ profileDetails: ['', Validators.required] }),
      skills: fb.group({
        programmingLanguages: [[]],
        ides: [[]],
        operatingSystems: [[]],
        devops: [[]],
        databases: [[]],
        platforms: [[]],
        other: [[]]
      }),
      hobbies: fb.group({ hobbiesDetails: ['', Validators.required] }),
      qualifications: [[]],
      workExperience: [[]]
    });
  }

  ngOnInit() {
    this.cvForm.patchValue(new CvModel());
  }

  public removeSkill(category, value): void {
    this.cvForm.patchValue({
      skills: { [category]: this.cvForm.value.skills[category].filter(v => v !== value) }
    });
  }

  public addSkill(category, { value, input }: MatChipInputEvent): void {
    if (value) {
      this.cvForm.patchValue({
        skills: { [category]: [...this.cvForm.value.skills[category], value] }
      });
    }
    input.value = '';
  }


  onGenerateCvButtonClicked() {
    const { skills, qualifications, workExperience, ...rest } = this.cvForm.value;
    this.cvRemoteService.getCvPdf(
      _.merge(new CvModel(), {
        allSkills: [skills],
        allQualifications: qualifications,
        allWorkExperience: workExperience,
        fullName: `${rest.firstName} ${rest.surname}`,
        ...rest
      } as CvModel));
  }

}

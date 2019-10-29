import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceComponent } from './work-experience.component';
import { MatTableModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WorkExperienceModel } from 'src/app/cv/_common/models/cv.model';

describe('WorkExperienceComponent', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkExperienceComponent],
      imports: [
        FormsModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor methods', () => {
    it('should store the onChange callback when called', () => {
      const spy = jasmine.createSpy('onChangeSpy', (v) => { });
      component.onChange = null;
      component.registerOnChange(spy);
      component.onChange(null);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should store the onTouch callback when called', () => {
      const spy = jasmine.createSpy('onTouchSpy', () => { });
      component.onTouch = null;
      component.registerOnTouched(spy);
      component.onTouch();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should update the interval disabled state of the control', () => {
      component.isDisabled = false;
      component.setDisabledState(true);
      expect(component.isDisabled).toBeTruthy();
    });
    it('should update the internal value of the control', () => {
      const testData = [{ workExperienceDetails: '', workExperienceFeedback: [], start: null, end: null, jobTitle: '' }];
      component.workExperienceTableDataSource.data = [];
      component.writeValue(testData);
      expect(component.workExperienceTableDataSource.data).toEqual(testData);
    });
  });
  describe('built-in validation', () => {
    // VALID
    it('should return null if value of control is null (no overlap required validator)', () => {
      expect(component.validate({ value: null })).toBeNull();
    });
    it('should return null if value of control is empty array (no overlap required, min validator)', () => {
      expect(component.validate({ value: [] })).toBeNull();
    });
    it('should return null if value of control is one populated qualification', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: 'example exp', workExperienceFeedback: [],
          start: new Date(), end: new Date(), jobTitle: 'example exp'
        }]
      })).toBeNull();
    });
    it('should return null if value of control is multiple populated qualifications', () => {
      expect(component.validate({
        value: [
          {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }, {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }, {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }, {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }
        ]
      })).toBeNull();
    });

    // INVALID
    it('should return error if value of control is one unpopulated qualification', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: '', workExperienceFeedback: [],
          start: null, end: null, jobTitle: ''
        }]
      })).not.toBeNull();
    });
    it('should return error if value of control is one qualification with no job title', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: 'example exp', workExperienceFeedback: [],
          start: new Date(), end: new Date(), jobTitle: ''
        }]
      })).not.toBeNull();
    });
    it('should return error if value of control is one qualification with no start date', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: 'example exp', workExperienceFeedback: [],
          start: null, end: new Date(), jobTitle: ''
        }]
      })).not.toBeNull();
    });
    it('should return error if value of control is one qualification with no end date', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: 'example exp', workExperienceFeedback: [],
          start: new Date(), end: null, jobTitle: ''
        }]
      })).not.toBeNull();
    });
    it('should return error if value of control is one qualification with no experience details', () => {
      expect(component.validate({
        value: [{
          workExperienceDetails: '', workExperienceFeedback: [],
          start: new Date(), end: new Date(), jobTitle: ''
        }]
      })).not.toBeNull();
    });
    it('should return error if value of control is multiple unpopulated qualifications', () => {
      expect(component.validate({
        value: [
          {
            workExperienceDetails: '', workExperienceFeedback: [],
            start: null, end: null, jobTitle: ''
          }, {
            workExperienceDetails: '', workExperienceFeedback: [],
            start: null, end: null, jobTitle: ''
          }
        ]
      })).not.toBeNull();
    });
    it('should return error if value has at least one unpopulated qualification', () => {
      expect(component.validate({
        value: [
          {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }, {
            workExperienceDetails: '', workExperienceFeedback: [],
            start: null, end: null, jobTitle: ''
          }, {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }, {
            workExperienceDetails: 'example exp', workExperienceFeedback: [],
            start: new Date(), end: new Date(), jobTitle: 'example exp'
          }
        ]
      })).not.toBeNull();
    });
  });

  describe('getFormattedDateRange', () => {
    it('should return "" if no dates provided', () => {
      expect(component.getFormattedDateRange({ start: null, end: null } as WorkExperienceModel)).toEqual('');
    });
    it('should return "<START> - Present" if only start date provided', () => {
      expect(component.getFormattedDateRange({ start: new Date('2010-01-01'), end: null } as WorkExperienceModel))
        .toEqual('Jan 2010 - Present');
    });
    it('should return "<START> - <END>" if two dates provided', () => {
      expect(component.getFormattedDateRange({ start: new Date('2010-01-01'), end: new Date('2015-10-01') } as WorkExperienceModel))
        .toEqual('Jan 2010 - Oct 2015');
    });
  });
});

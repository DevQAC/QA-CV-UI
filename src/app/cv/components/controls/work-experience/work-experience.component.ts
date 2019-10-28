import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { WorkExperienceModel } from 'src/app/cv/_common/models/cv.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkExperienceComponent),
    multi: true
  }],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class WorkExperienceComponent implements ControlValueAccessor {
  public workExperienceTableDataSource = new MatTableDataSource<WorkExperienceModel>();
  public columns = [];
  public expandedElement: WorkExperienceModel;

  // ControlValueAccessor methods
  public onChange: (v: WorkExperienceModel[]) => {};
  public onTouch: () => {};
  public isDisabled = false;

  constructor() {
    this.columns = ['title', 'remove'];
  }

  onNewWorkExperienceClick(): void {
    const lastExp = this.workExperienceTableDataSource.data[this.workExperienceTableDataSource.data.length - 1];

    if (!lastExp || lastExp.jobTitle || lastExp.end || lastExp.start || lastExp.workExperienceDetails) {
      const newExperience = {
        jobTitle: '',
        start: null,
        end: null,
        workExperienceDetails: '',
        workExperienceFeedback: []
      };
      this.workExperienceTableDataSource.data = [
        ...this.workExperienceTableDataSource.data, newExperience];
      this.expandedElement = newExperience;
      this.announceChange();
    }
  }

  public onRemoveWorkExperienceClicked(index: number): void {
    this.workExperienceTableDataSource.data.splice(index, 1); // setters don't get called by higher order functions so do it directly
    this.workExperienceTableDataSource._updateChangeSubscription(); // force the table to update (it doesn't auto detect splices)
    this.announceChange();
  }


  public announceChange() {
    this.onChange(this.workExperienceTableDataSource.data);
    this.onTouch();
  }

  public getFormattedDateRange({ start, end }: WorkExperienceModel): string {
    const dateFormat = 'MMM GGGG';
    const startMom = moment(start);
    const endMom = !!end ? moment(end) : null;

    if (startMom.isValid() || (!!endMom && endMom.isValid())) {
      const formattedStart = startMom.format(dateFormat);
      const formattedEnd = !!endMom ? endMom.format(dateFormat) : 'Present';
      return formattedStart + ' - ' + formattedEnd;
    } else {
      return '';
    }
  }


  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.workExperienceTableDataSource.data = obj;
  }

  registerOnChange(fn: (v: WorkExperienceModel[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}

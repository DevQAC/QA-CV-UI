import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import { QualificationModel } from 'src/app/cv/_common/models/cv.model';
import { MatTableDataSource } from '@angular/material';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QualificationsComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: QualificationsComponent,
    multi: true
  }
  ]
})
export class QualificationsComponent implements ControlValueAccessor {
  public qualisTableDataSource = new MatTableDataSource<QualificationModel>();

  public columns = [];

  // ControlValueAccessor members
  public onChange: (v: QualificationModel[]) => {};
  public onTouch: () => {};
  public isDisabled = false;

  constructor() {
    this.columns = ['qualificationDetails', 'remove'];
  }

  onNewQualiClick(): void {
    this.qualisTableDataSource.data = [
      ...this.qualisTableDataSource.data,
      {
        qualificationDetails: '',
        qualificationFeedback: []
      }
    ];
    this.announceChange();
  }

  public onQualificationDetailsInputChange(qualification: QualificationModel, value: string) {
    qualification.qualificationDetails = value;
    this.announceChange();
  }

  private announceChange(): void {
    this.onChange(this.qualisTableDataSource.data);
    this.onTouch();
  }

  public onRemoveQualificationClicked(index: number): void {
    this.qualisTableDataSource.data.splice(index, 1); // setters don't get called by higher order functions so do it directly
    this.qualisTableDataSource._updateChangeSubscription(); // force the table to update (it doesn't auto detect splices)
    this.announceChange();
  }

  //Validator
  validate({ value }: { value: QualificationModel[] }): null | any {
    if (Array.isArray(value)) {
      return value.every(e => e.qualificationDetails) ? null : { qualificationEmpty: 'Qualifications must be populated!' };
    } else {
      return null
    }
  }

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.qualisTableDataSource.data = obj;
  }

  registerOnChange(fn: (v: QualificationModel[]) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceComponent } from './work-experience.component';
import { MatTableModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('WorkExperienceComponent', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkExperienceComponent ],
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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';

import { GenerateCvComponent } from './generate-cv.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatChipsModule, MatButtonModule, MatIconModule } from '@angular/material';
import { QualificationsComponent } from '../controls/qualifications/qualifications.component';
import { WorkExperienceComponent } from '../controls/work-experience/work-experience.component';
import { CvService } from '../../_common/services/cv.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockCvService {

}

describe('GenerateCvComponent', () => {
  let component: GenerateCvComponent;
  let fixture: ComponentFixture<GenerateCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GenerateCvComponent,
        MockComponent(QualificationsComponent),
        MockComponent(WorkExperienceComponent)
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: CvService, useClass: MockCvService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsComponent } from './qualifications.component';
import { MatTableModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('QualificationsComponent', () => {
  let component: QualificationsComponent;
  let fixture: ComponentFixture<QualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationsComponent ],
      imports: [
        FormsModule,
        MatTableModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

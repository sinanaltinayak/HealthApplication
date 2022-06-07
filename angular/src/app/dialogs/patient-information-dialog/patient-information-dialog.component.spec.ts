import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientInformationDialogComponent } from './patient-information-dialog.component';

describe('PatientInformationDialogComponent', () => {
  let component: PatientInformationDialogComponent;
  let fixture: ComponentFixture<PatientInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientInformationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

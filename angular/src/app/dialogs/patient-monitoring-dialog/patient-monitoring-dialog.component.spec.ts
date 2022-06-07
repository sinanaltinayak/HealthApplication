import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMonitoringDialogComponent } from './patient-monitoring-dialog.component';

describe('PatientMonitoringDialogComponent', () => {
  let component: PatientMonitoringDialogComponent;
  let fixture: ComponentFixture<PatientMonitoringDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMonitoringDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMonitoringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

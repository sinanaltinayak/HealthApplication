import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDialogComponent } from './diagnosis-dialog.component';

describe('DiagnosisDialogComponent', () => {
  let component: DiagnosisDialogComponent;
  let fixture: ComponentFixture<DiagnosisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

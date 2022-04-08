import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTestComponent } from './confirm-test.component';

describe('ConfirmTestComponent', () => {
  let component: ConfirmTestComponent;
  let fixture: ComponentFixture<ConfirmTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

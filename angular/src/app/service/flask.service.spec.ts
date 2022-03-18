import { TestBed } from '@angular/core/testing';

import { FlaskService } from './flask.service';

describe('FlaskService', () => {
  let service: FlaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

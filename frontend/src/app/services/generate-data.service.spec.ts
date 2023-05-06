import { TestBed } from '@angular/core/testing';

import { GenerateDataService } from './generate-data.service';

describe('GenerateDataService', () => {
  let service: GenerateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

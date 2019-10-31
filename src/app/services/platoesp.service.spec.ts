import { TestBed } from '@angular/core/testing';

import { PlatoespService } from './platoesp.service';

describe('PlatoespService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatoespService = TestBed.get(PlatoespService);
    expect(service).toBeTruthy();
  });
});

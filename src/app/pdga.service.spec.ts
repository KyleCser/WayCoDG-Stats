import { TestBed } from '@angular/core/testing';

import { PdgaService } from './pdga.service';

describe('PdgaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdgaService = TestBed.get(PdgaService);
    expect(service).toBeTruthy();
  });
});

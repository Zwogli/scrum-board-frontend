import { TestBed } from '@angular/core/testing';

import { OverlayDeleteTaskService } from './overlay-delete-task.service';

describe('OverlayDeleteTaskService', () => {
  let service: OverlayDeleteTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayDeleteTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

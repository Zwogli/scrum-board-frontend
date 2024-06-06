import { TestBed } from '@angular/core/testing';

import { OverlayNewTaskService } from './overlay-new-task.service';

describe('OverlayService', () => {
  let service: OverlayNewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayNewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

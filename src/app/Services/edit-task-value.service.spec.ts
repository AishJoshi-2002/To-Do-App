import { TestBed } from '@angular/core/testing';

import { EditTaskValueService } from './edit-task-value.service';

describe('EditTaskValueService', () => {
  let service: EditTaskValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTaskValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

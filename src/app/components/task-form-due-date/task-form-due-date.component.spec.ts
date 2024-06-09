import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormDueDateComponent } from './task-form-due-date.component';

describe('TaskFormDueDateComponent', () => {
  let component: TaskFormDueDateComponent;
  let fixture: ComponentFixture<TaskFormDueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormDueDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

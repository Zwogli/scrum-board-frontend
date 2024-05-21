import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskDueDateComponent } from './new-task-due-date.component';

describe('NewTaskDueDateComponent', () => {
  let component: NewTaskDueDateComponent;
  let fixture: ComponentFixture<NewTaskDueDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTaskDueDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTaskDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

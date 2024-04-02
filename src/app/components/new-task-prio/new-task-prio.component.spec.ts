import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskPrioComponent } from './new-task-prio.component';

describe('NewTaskPrioComponent', () => {
  let component: NewTaskPrioComponent;
  let fixture: ComponentFixture<NewTaskPrioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTaskPrioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTaskPrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

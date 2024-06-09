import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskInterface } from '../../models.ts/task.model';
import { OverlayService } from '../../services/overlay/overlay.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  @Input() task: TaskInterface | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<TaskInterface>();
  submitted: boolean = false;

  formTitle: string = '';
  formDescription: string = '';
  selectedColumn: string = '';
  selectedColor: string = '';
  selectedPriority: string = '';
  dueDate: string = '';

  constructor(private overlayService: OverlayService) {}

  ngOnInit() {
    if (this.isEditMode && this.task) {
      this.formTitle = this.task.title;
      this.formDescription = this.task.description;
      this.selectedColumn = this.task.board_column;
      this.selectedColor = this.task.color;
      this.selectedPriority = this.task.priority;
      this.dueDate = this.task.due_date;
    }
  }

  onSelectedColumnChange(column: string) {
    this.selectedColumn = column;
  }

  onSelectedColorChange(color: string) {
    this.selectedColor = color;
  }

  updatePriority(priority: string) {
    this.selectedPriority = priority;
  }

  onDueDateChange(date: string) {
    this.dueDate = date;
  }

  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      const taskData: TaskInterface = {
        title: this.formTitle,
        description: this.formDescription,
        board_column: this.selectedColumn,
        color: this.selectedColor,
        priority: this.selectedPriority,
        due_date: this.dueDate,
        created_at: this.task?.created_at || new Date().toISOString(),
        author: this.task?.author || 0,
        author_username: this.task?.author_username || 'anonymous',
        id: this.task?.id ?? 0,
      };
      this.formSubmit.emit(taskData);
    }
  }

  toggleOverlay() {
    if (this.isEditMode) {
      this.overlayService.toggleOverlayEditTask();
    } else {
      this.overlayService.toggleOverlayNewTask();
    }
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
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
  selectedColumn: string = 'board-column-todo';
  selectedColor: string = 'red';
  selectedPriority: string = 'low';
  dueDate: string = '';

  constructor(
    private overlayService: OverlayService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    if (this.isEmptyTask()) {
      this.setDueDate();
    } else if (this.isEditTask()) {
      this.formTitle = this.task!.title;
      this.formDescription = this.task!.description;
      this.selectedColumn = this.task!.board_column;
      this.selectedColor = this.task!.color;
      this.selectedPriority = this.task!.priority;
      this.dueDate = this.task!.due_date;
    }
    this.cdr.detectChanges();
  }

  isEmptyTask() {
    return !this.task;
  }

  isEditTask() {
    return this.isEditMode && this.task;
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
        due_date: this.formatDate(this.dueDate),
        created_at: this.task?.created_at || this.setNewDate(),
        author: this.task?.author || 0,
        author_username: this.task?.author_username || 'anonymous',
        id: this.task?.id ?? 0,
      };
      this.formSubmit.emit(taskData);
      console.log('Submit TaskForm: ', taskData);
    }
  }

  setNewDate() {
    return new Date().toISOString().split('T')[0];
  }

  setDueDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.dueDate = `${year}-${month}-${day}`;
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  toggleOverlay() {
    if (this.isEditMode) {
      this.overlayService.toggleOverlayEditTask();
    } else {
      this.overlayService.toggleOverlayNewTask();
    }
  }
}

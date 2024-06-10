import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form-due-date',
  templateUrl: './task-form-due-date.component.html',
  styleUrl: './task-form-due-date.component.scss',
})
export class TaskFormDueDateComponent {
  @Output() dueDateChange = new EventEmitter<string>();
  @Input() parentSubmitted = false;
  @Input() dueDate: string = '';
  isInvalid = false;
  minDate: string = new Date().toISOString().split('T')[0]; // Das aktuelle Datum im ISO-Format ohne Zeit;


  constructor() {}

  ngOnInit(): void {
    // Setze das aktuelle Datum als minDate im Format yyyy-MM-dd
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert
    const year = today.getFullYear();

    this.minDate = `${year}-${month}-${day}`;
    if (!this.dueDate) {
      this.dueDate = this.minDate;
      console.log('Check DueDtae: ', this.dueDate);
    }
  }

  onDueDateChange(event: any) {
    // const selectedDate = event.target.value;
    // this.dueDateChange.emit(selectedDate);
    const selectedDate = event.target.value;
    const comparableSelectedDate = selectedDate.replace(/-/g, '');
    const comparableMinDate = this.minDate.replace(/-/g, '');

    this.isInvalid = comparableSelectedDate < comparableMinDate;
    this.dueDateChange.emit(event.target.value);
  }
}

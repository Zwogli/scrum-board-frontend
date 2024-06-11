import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-task-form-due-date',
  templateUrl: './task-form-due-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaskFormDueDateComponent),
      multi: true,
    },
  ],
})
export class TaskFormDueDateComponent implements ControlValueAccessor {
  @Input() parentSubmitted = false;
  @Input() dueDate: string = new Date().toISOString().split('T')[0];
  isInvalid = false;
  minDate: string = new Date().toISOString().split('T')[0];

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dueDate']) {
      this.validateDate();
    }
    if (changes['parentSubmitted'] && this.parentSubmitted) {
      this.validateDate();
    }
  }

  writeValue(value: string): void {
    this.dueDate = value;
    this.validateDate();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDueDateChange(event: any) {
    this.dueDate = event.target.value;
    this.validateDate();
    this.onChange(this.dueDate);
    this.onTouched();
  }

  validateDate() {
    const selectedDate = new Date(this.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for comparison

    this.isInvalid = selectedDate < today;
  }
}
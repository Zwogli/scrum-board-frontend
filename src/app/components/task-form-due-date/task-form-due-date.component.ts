import { Component, forwardRef, Input } from '@angular/core';
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
  isInvalid = false;
  minDate: string = new Date().toISOString().split('T')[0];
  dueDate: string = this.minDate;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.dueDate = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onDueDateChange(event: any) {
    const selectedDate = event.target.value;
    const comparableSelectedDate = selectedDate.replace(/-/g, '');
    const comparableMinDate = this.minDate.replace(/-/g, '');

    this.isInvalid = comparableSelectedDate < comparableMinDate;
    this.dueDate = selectedDate;
    this.onChange(selectedDate);
    this.onTouched();
  }
}
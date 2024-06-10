import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-new-task-prio',
  templateUrl: './new-task-prio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewTaskPrioComponent),
      multi: true,
    },
  ],
})
export class NewTaskPrioComponent implements ControlValueAccessor {
  selectedPriority: string = 'low';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedPriority = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setPriority(priority: string) {
    this.selectedPriority = priority;
    this.onChange(priority);
    this.onTouched();
  }
}
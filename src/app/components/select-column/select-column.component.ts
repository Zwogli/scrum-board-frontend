import { Component, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-column',
  templateUrl: './select-column.component.html',
  styleUrls: ['./select-column.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectColumnComponent),
      multi: true,
    },
  ],
})
export class SelectColumnComponent implements ControlValueAccessor {
  selectedColumn: string = 'board-column-todo';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedColumn = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // handle the disabled state here if needed
  }

  onColumnSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedColumn = value;
    this.onChange(value);
    this.onTouched();
  }
}

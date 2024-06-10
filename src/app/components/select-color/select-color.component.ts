import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectColorComponent),
      multi: true,
    },
  ],
})
export class SelectColorComponent implements ControlValueAccessor {
  selectedColor: string = 'red';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedColor = value;
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

  onColorSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedColor = value;
    this.onChange(value);
    this.onTouched();
  }
}
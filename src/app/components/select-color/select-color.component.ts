import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrl: './select-color.component.scss',
})
export class SelectColorComponent {
  @Output() selectedColorChange = new EventEmitter<string>(); // Deklariere das EventEmitter-Attribut

  selectedColor: string = 'red'; // Initialisieren des selectedColumn-Attributs

  onColorSelect() {
    this.selectedColorChange.emit(this.selectedColor); // Auslösen des Ereignisses mit dem ausgewählten Wert
  }
}

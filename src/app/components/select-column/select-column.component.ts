import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-column',
  templateUrl: './select-column.component.html',
  styleUrls: ['./select-column.component.scss'],
})
export class SelectColumnComponent {
  @Output() selectedColumnChange = new EventEmitter<string>(); // Deklariere das EventEmitter-Attribut

  selectedColumn: string = 'board-column-todo'; // Initialisieren des selectedColumn-Attributs

  onColumnSelect() {
    this.selectedColumnChange.emit(this.selectedColumn); // Auslösen des Ereignisses mit dem ausgewählten Wert
  }
}

import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { OverlayService } from '../../services/overlay/overlay.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  form: Partial<TaskInterface> = {}; // Partial<TaskInterface> ermöglicht es uns, nur einige Felder des Interface zu verwenden
  formTitle: string = '';
  formDescription: string = '';
  formColumn: string = 'board-column-todo';
  formColor: string = 'red';
  formPriority: string = 'Low';
  currentDate: Date = new Date();
  isoDateString: string = this.currentDate.toISOString();
  formDue_date: string = '';

  constructor(private overlayService: OverlayService) {}

  sendForm() {
    // Erstelle ein Objekt, um nur den Titel und die Beschreibung zu speichern
    const formData: Partial<TaskInterface> = {
      title: this.formTitle,
      description: this.formDescription,
      created_at: this.isoDateString,
      due_date: this.formDue_date,
      priority: this.formPriority,
      color: this.formColor,
      board_column: this.formColumn,
    };

    // Logge das Objekt mit den Titel- und Beschreibungsdaten
    console.log('Form Data: ', formData);
  }

  onSelectedColumnChange(selectedColumn: string) {
    this.formColumn = selectedColumn; // Aktualisiere das selectedColumn-Attribut
  }

  onSelectedColorChange(selectedColor: string) {
    this.formColor = selectedColor; // Aktualisiere das selectedColumn-Attribut
  }

  updatePriority(priority: string) {
    this.formPriority = priority; // Aktualisiere das selectedPriority-Attribut
  }

  onDueDateChange(newDueDate: string) {
    this.formDue_date = newDueDate;
  }

  toggleOverlay() {
    this.overlayService.toggleOverlay();
  }
}

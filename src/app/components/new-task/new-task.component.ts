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
  formColumn: string = '';
  formColor: string = '';
  formPriority: string = '';

  constructor(private overlayService: OverlayService) {}


  sendForm() {
    // Erstelle ein Objekt, um nur den Titel und die Beschreibung zu speichern
    const formData: Partial<TaskInterface> = {
      title: this.formTitle,
      description: this.formDescription,
      board_column: this.formColumn,
      color: this.formColor,
      priority: this.formPriority,
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
    this.formPriority = priority;
  }

  toggleOverlay() {
    this.overlayService.toggleOverlay();
  }
}

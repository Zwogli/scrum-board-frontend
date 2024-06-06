import { Component, ViewChild } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { OverlayService } from '../../services/overlay/overlay.service';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post/post.service';

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
  formPriority: string = 'low';
  currentDate: Date = new Date();
  currentDateFormatted: string = this.dateFormatter();
  isoDateString: string = this.currentDate.toISOString();
  formDue_date: string = '';
  submitted = false;
  formGroupTitle = document.getElementById('formGroupTitle');

  constructor(
    private overlayService: OverlayService,
    private httpPOST: PostService
  ) {}

  dateFormatter() {
    return new Date().toISOString().split('T')[0];
  }

  submitForm(form: NgForm) {
    this.submitted = true;

    if (this.checkFormFields()) {
      this.removeErrorManager();
      this.sendForm();
    } else {
      console.error('new-task.component.ts: Send Form: Something went wrong! ');
      this.errorManager();
    }
  }

  checkFormFields(): boolean {
    return this.isCheckedTitel() && this.isCheckedDueDate();
  }

  isCheckedTitel() {
    return this.formTitle !== '';
  }

  isCheckedDueDate() {
    let comparableDue_Date = this.loadComparableDue_Date();
    const comparableCurrentDate = this.currentDateFormatted.replace(/-/g, '');
    return comparableDue_Date >= comparableCurrentDate;
  }

  loadComparableDue_Date() {
    let comparableDue_Date = '';
    if (this.formDue_date) {
      return (comparableDue_Date = this.formDue_date.replace(/-/g, ''));
    } else {
      // If formDue_date is empty, set it to the current date
      this.formDue_date = this.dateFormatter();
      return (comparableDue_Date = this.currentDateFormatted.replace(/-/g, ''));
    }
  }

  createFormObject() {
    return {
      title: this.formTitle,
      description: this.formDescription,
      created_at: this.currentDateFormatted,
      due_date: this.formDue_date,
      priority: this.formPriority,
      color: this.formColor,
      board_column: this.formColumn,
    };
  }

  sendForm() {
    const formData: Partial<TaskInterface> = this.createFormObject();
    this.httpPOST.postNewTask(formData).subscribe({
      next: (response) => {
        console.log('response from backend:', response);
        this.toggleNewTaskOverlay();
        // Hier kannst du weitere Logik hinzufügen, z.B. eine Erfolgsmeldung anzeigen
      },
      error: (error) => {
        console.error('Error saving task:', error);
        // Hier kannst du Fehlerbehandlung hinzufügen, z.B. eine Fehlermeldung anzeigen
      },
    });
  }

  errorManager() {
    if (this.formGroupTitle) {
      this.formGroupTitle.style.border = '1px solid red';
    }
  }

  removeErrorManager() {
    if (this.formGroupTitle) {
      this.formGroupTitle.style.border = '';
    }
  }

  onSelectedColumnChange(selectedColumn: string) {
    this.formColumn = selectedColumn; // update selectedColumn-attribute
  }

  onSelectedColorChange(selectedColor: string) {
    this.formColor = selectedColor; // update selectedColumn-attribute
  }

  updatePriority(priority: string) {
    this.formPriority = priority; // update selectedPriority-attribute
  }

  onDueDateChange(newDueDate: string) {
    this.formDue_date = newDueDate; // update due-date-attribute
  }

  toggleNewTaskOverlay() {
    this.overlayService.toggleOverlayNewTask();
  }
}

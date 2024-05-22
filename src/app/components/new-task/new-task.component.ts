import { Component, ViewChild } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { OverlayService } from '../../services/overlay/overlay.service';
import { NgForm } from '@angular/forms';

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
  submitted = false;
  formGroupTitle = document.getElementById('formGroupTitle');

  constructor(private overlayService: OverlayService) {}
  submitForm() {
    this.submitted = true;

    if (this.checkFormFields()) {
      if (this.formGroupTitle) {
        this.formGroupTitle.style.border = '';
      }
      this.sendForm();
    } else {
      if (this.formGroupTitle) {
        this.formGroupTitle.style.border = '1px solid red';
        console.error('Send Form: Something went wrong! ');
      }
    }
  }

  checkFormFields(): boolean {
    return this.formTitle !== '';
  }

  createFormObject() {
    return {
      title: this.formTitle,
      description: this.formDescription,
      created_at: this.isoDateString,
      due_date: this.formDue_date,
      priority: this.formPriority,
      color: this.formColor,
      board_column: this.formColumn,
    };
  }

  sendForm() {
    const formData: Partial<TaskInterface> = this.createFormObject();
    console.log('Log: Send Formdata: ', formData);
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

  toggleOverlay() {
    this.overlayService.toggleOverlay();
  }
}

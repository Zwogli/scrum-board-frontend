import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-task-due-date',
  templateUrl: './new-task-due-date.component.html',
  styleUrl: './new-task-due-date.component.scss',
})
export class NewTaskDueDateComponent {
  dateForm: FormGroup;
  minDate: string = '';

  constructor(private fb: FormBuilder) {
    // Initialisiere das FormGroup im Konstruktor
    this.dateForm = this.fb.group({
      date: [''],
    });
  }

  ngOnInit(): void {
    // Setze das aktuelle Datum als minDate im Format yyyy-MM-dd
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert
    const year = today.getFullYear();

    this.minDate = `${year}-${month}-${day}`;
  }
}

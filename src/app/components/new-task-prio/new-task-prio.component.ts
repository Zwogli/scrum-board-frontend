import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-task-prio',
  templateUrl: './new-task-prio.component.html',
  styleUrls: ['./new-task-prio.component.scss']
})
export class NewTaskPrioComponent {
  @Output() priorityChange = new EventEmitter<string>();

  setPriority(priority: string) {
    this.priorityChange.emit(priority);
  }
}

import { Component } from '@angular/core';
import { OverlayDeleteTaskService } from '../../services/overlay-delete-task/overlay-delete-task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  overlayDeleteTaskState: boolean = false;
  constructor(private overlayDeleteTaskService: OverlayDeleteTaskService) {}

  toggleDeleteOverlay() {
    this.overlayDeleteTaskService.toggleOverlay();
  }
}

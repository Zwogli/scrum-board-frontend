import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay/overlay.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  overlayDeleteTaskState: boolean = false;
  constructor(private overlayService: OverlayService) {}

  toggleDeleteOverlay() {
    this.overlayService.toggleOverlayDeleteTask();
  }
}

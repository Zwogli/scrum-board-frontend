import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay/overlay.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {
  constructor(private overlayService: OverlayService) {}

  toggleEditOverlay() {
    this.overlayService.toggleOverlayEditTask();
  }
}

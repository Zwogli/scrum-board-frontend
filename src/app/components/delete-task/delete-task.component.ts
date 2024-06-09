import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay/overlay.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  currentTaskId: number | null = null;

  constructor(
    private http: HttpClient,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.overlayService.currentTaskId$.subscribe((taskId) => {
      this.currentTaskId = taskId;
    });
  }

  toggleDeleteOverlay() {
    this.overlayService.toggleOverlayDeleteTask();
  }

  async confirmDeleteTask() {
    if (this.currentTaskId !== null) {
      const uri = `${environment.baseUrl}/tasks/${this.currentTaskId}/`;
      try {
        await lastValueFrom(this.http.delete(uri));

        // Notify the BoardComponent to update the task list
        this.overlayService.toggleOverlayDeleteTask();
      } catch (e) {
        console.error('Fehler beim Löschen der Aufgabe!', e);
      }
    }
  }
}

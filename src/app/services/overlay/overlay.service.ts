import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayNewTaskState = false;
  overlayNewTaskState$ = new Subject<boolean>();
  private overlayDeleteTaskState = false;
  overlayDeleteTaskState$ = new Subject<boolean>();

  toggleOverlayNewTask() {
    if (this.overlayNewTaskState == false) {
      this.overlayNewTaskState = true;
      this.overlayNewTaskState$.next(this.overlayNewTaskState);
    } else {
      this.overlayNewTaskState = false;
      this.overlayNewTaskState$.next(this.overlayNewTaskState);
    }
  }

  toggleOverlayDeleteTask() {
    if (this.overlayDeleteTaskState == false) {
      this.overlayDeleteTaskState = true;
      this.overlayDeleteTaskState$.next(this.overlayDeleteTaskState);
    } else {
      this.overlayDeleteTaskState = false;
      this.overlayDeleteTaskState$.next(this.overlayDeleteTaskState);
    }
  }
}

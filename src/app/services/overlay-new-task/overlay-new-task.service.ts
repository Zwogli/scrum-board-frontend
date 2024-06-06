import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayNewTaskService {
  private overlayNewTaskState = false;
  overlayNewTaskState$ = new Subject<boolean>();

  toggleOverlay() {
    if (this.overlayNewTaskState == false) {
      this.overlayNewTaskState = true;
      this.overlayNewTaskState$.next(this.overlayNewTaskState);
    } else {
      this.overlayNewTaskState = false;
      this.overlayNewTaskState$.next(this.overlayNewTaskState);
    }
  }
}

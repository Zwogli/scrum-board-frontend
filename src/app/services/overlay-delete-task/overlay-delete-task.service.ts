import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayDeleteTaskService {
  private overlayDeleteTaskState = false;
  overlayDeleteTaskState$ = new Subject<boolean>();

  constructor() {}

  toggleOverlay() {
    if (this.overlayDeleteTaskState == false) {
      this.overlayDeleteTaskState = true;
      this.overlayDeleteTaskState$.next(this.overlayDeleteTaskState);
    } else {
      this.overlayDeleteTaskState = false;
      this.overlayDeleteTaskState$.next(this.overlayDeleteTaskState);
    }
  }
}

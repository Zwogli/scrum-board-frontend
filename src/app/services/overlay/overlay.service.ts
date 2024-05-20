import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayState = false;
  overlayState$ = new Subject<boolean>();

  toggleOverlay() {
    if (this.overlayState == false) {
      this.overlayState = true;
      this.overlayState$.next(this.overlayState);
    } else {
      this.overlayState = false;
      this.overlayState$.next(this.overlayState);
    }
  }
}
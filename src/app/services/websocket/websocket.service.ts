import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject(`${environment.wsBaseUrl}`);
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}

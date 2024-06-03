import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket = new WebSocket(environment.wsBaseUrl);
  private messageSubject = new Subject<string>();

  constructor() {
    this.initWebSocket();
  }

  private initWebSocket() {
    this.socket.onmessage = (event) => {
      const message = event.data;
      this.messageSubject.next(message);
    };

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  public getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  // Weitere Methoden zum Senden und Empfangen von Nachrichten...
}

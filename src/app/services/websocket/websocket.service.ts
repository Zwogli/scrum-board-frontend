import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket=new WebSocket(environment.wsBaseUrl);

  constructor() {
    this.initWebSocket();
  }

  private initWebSocket() {
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

  // Weitere Methoden zum Senden und Empfangen von Nachrichten...
}
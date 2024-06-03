import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  private readonly SERVER_URL = environment.baseUrl;

  constructor() { 
    this.socket = new WebSocket(this.SERVER_URL);
  }

  public connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.onmessage = event => observer.next(event.data);
      this.socket.onerror = error => observer.error(error);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }
}

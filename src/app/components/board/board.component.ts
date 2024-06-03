import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OverlayService } from '../../services/overlay/overlay.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  requestOptions: any = {
    method: 'GET',
    redirect: 'follow',
  };
  allTasks: any = []; // allTasks: object[] = [];
  todoTasks: TaskInterface[] = [];
  progressTasks: TaskInterface[] = [];
  feedbackTasks: TaskInterface[] = [];
  doneTasks: TaskInterface[] = [];
  error: string = '';
  overlayState: boolean = false;

  constructor(
    private http: HttpClient,
    private overlayService: OverlayService,
    private websocketService: WebsocketService
  ) {}

  async ngOnInit() {
    this.overlayService.overlayState$.subscribe(state => {
      this.overlayState = state;
    })

    try {
      this.allTasks = await this.loadAllTasks();
      this.filterColumns(this.allTasks);
      // console.log('Task Object: ', this.allTasks);
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
    
     // Abonniere die Nachrichten des Websockets
     this.websocketService.getMessageSubject().subscribe(async (message) => {
      // Hier kannst du auf eingehende WebSocket-Nachrichten reagieren und entsprechende Aktualisierungen vornehmen
      console.log('Received message from WebSocket:', message);

      // Führe die Aktualisierungen nur durch, wenn die Nachricht das gewünschte Update auslöst
      if (message === 'Form data saved') {
        try {
          this.allTasks = await this.loadAllTasks();
          this.filterColumns(this.allTasks);
          // console.log('Task Object: ', this.allTasks);
        } catch (e) {
          this.error = 'Fehler beim Laden!';
        }
      }
     });
  }

  loadAllTasks() {
    /**
     * Subscribe with "lastValueFrom" the http.get() Observable
     */
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(
      this.http.get(url) //, {headers: headers,}
    );
  }

  filterColumns(tasksObj: TaskInterface[]) {
    /**
     * Filter all objects for visual display in the correct column
     */
    this.todoTasks = tasksObj.filter(
      (task) => task.board_column === 'board-column-todo'
    );
    this.progressTasks = tasksObj.filter(
      (task) => task.board_column === 'board-column-progress'
    );
    this.feedbackTasks = tasksObj.filter(
      (task) => task.board_column === 'board-column-feedback'
    );
    this.doneTasks = tasksObj.filter(
      (task) => task.board_column === 'board-column-done'
    );
  }

  getCardBackgroundColor(color: string): string {
    return `var(--card-bg-${color})`;
  }

  toggleOverlay() {
    this.overlayService.toggleOverlay();
  }
}

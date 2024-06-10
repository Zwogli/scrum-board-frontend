import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OverlayService } from '../../services/overlay/overlay.service';
import { WebSocketService } from '../../services/websocket/websocket.service';

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
  overlayNewTaskState: boolean = false;
  overlayDeleteTaskState: boolean = false;
  overlayEditTaskState: boolean = false;

  currentTask: TaskInterface | null = null;
  isEditMode: boolean = false;

  constructor(
    private http: HttpClient,
    private overlayService: OverlayService,
    private websocketService: WebSocketService
  ) {}

  async ngOnInit() {
    this.overlayService.overlayNewTaskState$.subscribe((state) => {
      this.overlayNewTaskState = state;
    });
    this.overlayService.overlayDeleteTaskState$.subscribe((state) => {
      this.overlayDeleteTaskState = state;
    });
    this.overlayService.overlayEditTaskState$.subscribe((state) => {
      this.overlayEditTaskState = state;
    });

    try {
      this.updateColumns();
      // this.setupWebSocket();
    } catch (e) {
      this.error = 'Fehler beim Laden!';
    }
  }

  loadAllTasks() {
    /**
     * Subscribe with "lastValueFrom" the http.get() Observable
    */
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(
      this.http.get(url)
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

  // Overlay manager
  toggleNewTaskOverlay() {
    this.currentTask = null;
    this.isEditMode = false;
    this.overlayService.toggleOverlayNewTask();
  }

  toggleDeleteTaskOverlay(taskId: number | null) {
    this.overlayService.setCurrentTaskId(taskId);
    this.overlayService.toggleOverlayDeleteTask();
  }

  toggleEditTaskOverlay(task: TaskInterface) {
    this.currentTask = task;
    this.isEditMode = true;
    this.overlayService.toggleOverlayEditTask();
    console.log('Open EditTask board: ', this.currentTask);
  }

  // setupWebSocket() {
  //   this.websocketService.getMessages().subscribe((message) => {
  //     console.log('Received message:', message);
  //     if (message && message.task) {
  //       this.allTasks.push(message.task);
  //       this.filterColumns(this.allTasks);
  //     }
  //   });
  // }

  async submitTask(task: TaskInterface) {
    if (this.isEditMode) {
      await this.updateTask(task);
      this.overlayService.toggleOverlayEditTask();
      this.isEditMode = false;
    } else {
      await this.createTask(task);
      this.overlayService.toggleOverlayNewTask();
    }
  }

  async createTask(task: TaskInterface) {
    const url = `${environment.baseUrl}/tasks/`;
    try {
      const newTask = await lastValueFrom(
        this.http.post<TaskInterface>(url, task)
      );
      this.allTasks.push(newTask);
      this.filterColumns(this.allTasks);
    } catch (e) {
      console.error('Fehler beim Erstellen der Aufgabe!', e);
    }
  }

  async updateTask(task: TaskInterface) {
    const url = `${environment.baseUrl}/tasks/${task.id}/`;
    try {
      const updatedTask = await lastValueFrom(
        this.http.put<TaskInterface>(url, task)
      );
      this.filterColumns([updatedTask]);
      this.updateColumns();
    } catch (e) {
      console.error('Fehler beim Aktualisieren der Aufgabe!', e);
    }
  }

  async updateColumns() {
    this.allTasks = await this.loadAllTasks();
    this.filterColumns(this.allTasks);
  }
}

import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OverlayService } from '../../services/overlay/overlay.service';

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
    private overlayService: OverlayService
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
      this.error = 'Fehler beim laden!';
    }
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

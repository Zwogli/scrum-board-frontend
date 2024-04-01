import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  allTasks: any = [];
  // allTasks: object[] = [];
  todoTasks: TaskInterface[] = [];
  progressTasks: TaskInterface[] = [];
  feedbackTasks: TaskInterface[] = [];
  doneTasks: TaskInterface[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.allTasks = await this.loadAllTasks();
      // this.parseTextToJson(this.allTasks);
      this.filterColumns(this.allTasks);
    } catch (e) {
      this.error = 'Fehler beim laden!';
    }
    /*  await fetch('http://127.0.0.1:8000/tasks/', this.requestOptions)
      .then((response) => response.text())
      .then((result) => this.parseTextToJson(result))
      .catch((error) => console.error(error)); */
  }

  loadAllTasks() {
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(
      this.http.get(url) //, {headers: headers,}
    );
  }

/*   parseTextToJson(result: any) {
    let tasksObj = JSON.parse(result);
    this.allTasks.push(tasksObj);
    this.filterColumns(tasksObj);
  } */

  filterColumns(tasksObj: TaskInterface[]) {
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
}

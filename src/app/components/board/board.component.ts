import { Component } from '@angular/core';
import { TaskInterface } from '../../models.ts/task.model';

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
  allTasks: object[] = [];
  todoTasks: TaskInterface[] = [];
  progressTasks: TaskInterface[] = [];
  feedbackTasks: TaskInterface[] = [];
  doneTasks: TaskInterface[] = [];

  constructor() {}

  async ngOnInit() {
    await fetch('http://127.0.0.1:8000/tasks/', this.requestOptions)
      .then((response) => response.text())
      .then((result) => this.parseTextToJson(result))
      .catch((error) => console.error(error));
  }

  parseTextToJson(result: any) {
    let tasksObj = JSON.parse(result);
    this.allTasks.push(tasksObj);
    this.filterColumns(tasksObj);
  }

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

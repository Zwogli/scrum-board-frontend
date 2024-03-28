import { Component } from '@angular/core';

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

  constructor() {}

  async ngOnInit() {
    await fetch('http://127.0.0.1:8000/tasks/', this.requestOptions)
      .then((response) => response.text())
      .then((result) => this.parseTextToJson(result))
      .catch((error) => console.error(error));
  }

  parseTextToJson(result: any) {
    let tasksObj = JSON.parse(result);
    console.log('Show all tasks: ', tasksObj);
    console.log('Show id: ', tasksObj[0].board_column);
  }
}

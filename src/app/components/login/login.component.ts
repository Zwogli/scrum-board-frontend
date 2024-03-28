import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor() {}

  async login() {
    // Logic communication with backend
    let response = await this.loginWithUsernameAndPassword();
    console.log('Login response: ', response);
  }

  loginWithUsernameAndPassword(){

  }
}

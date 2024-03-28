import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  async login() {
    // Logic communication with backend
    try {
      let response = await this.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log('Login response: ', response);
    } catch (e) {
      console.error(e);
    }
  }

  loginWithUsernameAndPassword(username: string, password: string) {
    debugger;
    const url = environment.baseUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}

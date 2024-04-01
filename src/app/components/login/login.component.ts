import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private as: AuthService) {}

  async login() {
    // Logic communication with backend
    try {
      let response = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      console.log('Login response: ', response);
    } catch (e) {
      console.error(e);
    }
  }


}

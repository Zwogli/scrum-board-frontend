import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  enabled: boolean = true;
  username: string = '';
  password: string = '';

  constructor(private as: AuthService, private router: Router) {}

  async login() {
    /**
     * Manage login get token or Error
     */
    this.activeForm(false);
    try {
      await this.getLoginToken();
      this.navigateByUrl('/tasks');
    } catch (e: unknown) {
      this.errorManager(e);
    }
  }

  async getLoginToken() {
    /**
     * Backend interface, a token is sent back if the login data is correct
     */
    let response: any = await this.as.loginWithUsernameAndPassword(
      this.username,
      this.password
    );
    console.log('Login response: ', response);
    const responseToken = response.token;
    sessionStorage.setItem('token', responseToken);
  }

  activeForm(boolean: boolean) {
    this.enabled = boolean;
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  errorManager(e: unknown) {
    alert('Login fehlgeschlagen!');
    console.error(e);
    this.activeForm(true);
  }
}

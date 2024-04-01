import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private as: AuthService, private router: Router) {}

  login() {
    // Logic communication with backend
    try {
      this.getLoginToken();
      this.navigateByUrl('/tasks')
    } catch (e) {
      console.error(e);
    }
  }

  async getLoginToken(){
    let response: any = await this.as.loginWithUsernameAndPassword(
      this.username,
      this.password
    );
    console.log('Login response: ', response);
    const responseToken = response.token;
    sessionStorage.setItem('token', responseToken);
  }

  navigateByUrl(url:string){
    this.router.navigateByUrl(url);
  }
}

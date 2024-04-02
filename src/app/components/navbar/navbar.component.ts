import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private http: HttpClient, private router: Router) {}

  async logout() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Token ' + token);
      sessionStorage.removeItem('token');
      this.http
        .post(environment.baseUrl + '/logout/', {}, { headers })
        .subscribe(() => {
          this.router.navigateByUrl('/login');
          // add logout message
        });
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  formData = {
    /* Daten aus deinem Formular */
  };
  token = sessionStorage.getItem('token'); // backend-token

  constructor(private http: HttpClient) {}

  postNewTask(aufgabenDaten: any) {
    const url = environment.baseUrl + '/tasks/';
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(url, aufgabenDaten, { headers });
  }
}

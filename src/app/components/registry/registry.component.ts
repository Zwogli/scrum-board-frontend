import { Component } from '@angular/core';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.scss',
})
export class RegistryComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';

  constructor() {}

  registry() {
    // Communicate with backend
  }
}

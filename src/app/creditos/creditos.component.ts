import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-creditos',
  imports: [RouterLink],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
  user: string = ''

  constructor(private authService: AuthService) {
    this.user = localStorage.getItem('user') || '';
  }

  logout() {
    this.authService.logout();

  }
}

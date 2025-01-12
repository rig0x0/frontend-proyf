import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: string = ''

  constructor(private authService: AuthService) {
    this.user = localStorage.getItem('user') || '';
  }

  logout() {
    this.authService.logout();
  }
} 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';
import { authResponse } from '../data/auth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = "https://backend-proyf.vercel.app/api/v1/auth";

  constructor(private httpClient: HttpClient, private router: Router) { }  // Inyección de HttpClient

  register(username: string, password: string): Observable<authResponse> {
    const body = { username, password };
    return this.httpClient.post<authResponse>(`${this.urlApi}/register`, body);
  }

  login(username: string, password: string):Observable<authResponse> {
    const body = { username, password };
    return this.httpClient.post<authResponse>(`${this.urlApi}/login`, body);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}

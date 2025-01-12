import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)
  errorMessage: string = '';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Formulario enviado:', this.loginForm.value);

    const username = this.username?.value ?? '';
    const password = this.password?.value ?? '';

    console.log(username, password)

    this.authService.login(username, password).subscribe(response => {
      console.log(response)
      if (response.statusCodeValue === 200) {
        localStorage.setItem('refresh_token', response.body.refresh_token)
        localStorage.setItem('access_token', response.body.access_token)
        localStorage.setItem('user_id', response.body.user_id.toString())
        localStorage.setItem('user', response.body.username)
        this.router.navigate(['/dashboard']);
      } else {
        switch (response.statusCodeValue) {
          case 401:
            this.errorMessage = 'Usuario o contraseña incorrectos';
            break;
          case 404:
            this.errorMessage = 'Usuario no encontrado';
            break;
          case 403:
            this.errorMessage = 'Acceso denegado';
            break;
          default:
            this.errorMessage = 'Ocurrió un error desconocido';
            break;
        }
      }
    }, error => {
      return this.errorMessage = "Ocurrió un error inesperado en el inicio de sesión"
    });
  }
}

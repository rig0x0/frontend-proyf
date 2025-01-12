import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)
  errorMessage: string = '';

  // Crear formulario con validación personalizada
  loginForm = this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator } // Validación personalizada a nivel de grupo
  );

  // Accesos rápidos a los controles
  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get password2() {
    return this.loginForm.get('password2')!;
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado:', this.loginForm.value);

    const username = this.username?.value;
    const password = this.password?.value;

    this.authService.register(username, password).subscribe(response => {
      console.log('Response', response);
      if (response.statusCodeValue === 200) {
        localStorage.setItem('refresh_token', response.body.refresh_token)
        localStorage.setItem('access_token', response.body.access_token)
        localStorage.setItem('user_id', response.body.user_id.toString())
        localStorage.setItem('user', response.body.username)
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = "Ocurrió un error inesperado en el registro"
      }
    }, error => {
      return this.errorMessage = "Ocurrió un error inesperado en el inicio de sesión"
    });
  }

  // Validador personalizado para contraseñas
  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    return password === password2 ? null : { passwordsMismatch: true };
  }
}

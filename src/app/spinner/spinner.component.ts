import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  isLoading = false; // Inicialmente el spinner está oculto

  // Método para mostrar el spinner
  show() {
    this.isLoading = true;
  }

  // Método para ocultar el spinner
  hide() {
    this.isLoading = false;
  }
}

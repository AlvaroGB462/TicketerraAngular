import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Correo y contraseña son obligatorios';
      return;
    }

    // Enviar las credenciales (correo y contraseña) al backend
    this.authService.login({ correo: this.email, contrasena: this.password }).subscribe(
      (response) => {
        console.log('Login exitoso:', response);

        // Comprobar el rol del usuario y redirigir
        if (response.rol === 'adminSupremo') {
          this.router.navigate(['/admin']); // Redirigir al componente admin
        } else if (response.rol === 'user') {
          this.router.navigate(['/tickets']); // Redirigir al componente principal
        } else {
          this.errorMessage = 'Rol desconocido';
        }
      },
      (error) => {
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    );
  }
}

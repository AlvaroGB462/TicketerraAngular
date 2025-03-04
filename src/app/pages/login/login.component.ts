import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as bcrypt from 'bcryptjs';  // Importamos bcryptjs
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
      CommonModule,
      HttpClientModule,
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule
    ],
})
export class LoginComponent {
  email: string = '';  // Inicializa la variable con una cadena vacía
  password: string = '';  // Inicializa la variable con una cadena vacía
  emailForRecovery = '';
  recoveryToken = '';
  newPassword = '';
  showForgotPassword = false;  // Controla si se muestra el formulario de recuperación
  showChangePassword = false;  // Controla si se muestra el formulario para cambiar la contraseña

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Aseguramos que la contraseña no esté vacía antes de cifrarla
    if (!this.password || !this.email) {
      console.error('Correo o contraseña no pueden estar vacíos');
      return;
    }

    // Cifrado de la contraseña en el frontend antes de enviarla
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error en el cifrado de la contraseña:', err);
        return;
      }
      this.authService.login({ email: this.email, password: hashedPassword! }).subscribe(
        response => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/tickets']);
        },
        error => console.error('Error en login:', error)
      );
    });
  }

  recoverPassword() {
    // Verificamos que el correo de recuperación no esté vacío
    if (!this.emailForRecovery) {
      console.error('El correo electrónico es obligatorio para la recuperación');
      return;
    }

    // Llamamos al servicio para solicitar el token de recuperación
    this.authService.recoverPassword(this.emailForRecovery).subscribe(
      response => {
        console.log('Token enviado para recuperación de contraseña');
        this.showForgotPassword = false;
        this.showChangePassword = true;  // Mostramos el formulario para cambiar la contraseña
      },
      error => {
        console.error('Error al recuperar la contraseña', error);
      }
    );
  }

  changePassword() {
    // Verificamos que todos los campos estén llenos
    if (!this.recoveryToken || !this.newPassword) {
      console.error('El token de recuperación y la nueva contraseña son obligatorios');
      return;
    }

    // Cambiamos la contraseña utilizando el token de recuperación
    this.authService.changePassword(this.recoveryToken, this.newPassword).subscribe(
      response => {
        console.log('Contraseña cambiada exitosamente');
        this.router.navigate(['/login']);  // Redirigimos al login
      },
      error => {
        console.error('Error al cambiar la contraseña', error);
      }
    );
  }
}
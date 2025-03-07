import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
})
export class RegisterComponent {
  nombreCompleto: string = '';  // Nombre completo del usuario
  correo: string = '';  // Correo electrónico del usuario
  contrasena: string = '';  // Contraseña del usuario
  telefono: string = '';  // Teléfono del usuario (opcional)
  codigoPostal: string = '';  // Código postal (opcional)
  errorMessage: string = '';  // Mensaje de error en caso de falla
  successMessage: string = '';  // Mensaje de éxito
  mensaje: string = '';  // Mensaje general de estado

  constructor(private authService: AuthService) {}

  // Función para registrar al usuario
  registrarUsuario() {
    const usuario = {
      nombreCompleto: this.nombreCompleto,
      correo: this.correo,
      contrasena: this.contrasena,
      telefono: this.telefono,
      codigoPostal: this.codigoPostal
    };

    console.log('Datos del usuario:', usuario);  // Imprime los datos del usuario para verificar

    this.authService.registrarUsuario(usuario).subscribe(
      (response: { mensaje: string }) => {
        console.log('Respuesta del servidor:', response);  // Imprime la respuesta del servidor
        this.mensaje = 'Usuario registrado exitosamente.';
        this.successMessage = response.mensaje;  // Muestra el mensaje devuelto por el servidor
      },
      (error) => {
        console.error('Error en el registro:', error);  // Imprime el error completo
        this.mensaje = 'Hubo un problema al registrar el usuario.';
        this.errorMessage = 'Hubo un problema al registrar el usuario. Intenta nuevamente.';
      }
    );
  }
}

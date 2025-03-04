import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Importamos catchError para el manejo de errores

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/usuarios';  // URL de tu API

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    // Consultamos al usuario por su correo
    return this.http.post<any>(
      `${this.apiUrl}/obtenerPorCorreo`,
      { correo: credentials.email }
    ).pipe(
      catchError(error => throwError('Usuario no encontrado o error en el servidor'))
    );
  }

  // Método para recuperar la contraseña
  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/guardarToken`,
      { correo: email }
    ).pipe(
      catchError(error => throwError('Error al enviar el token de recuperación'))
    );
  }

  // Método para cambiar la contraseña con el token de recuperación
  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/restablecerContrasena`,
      { token: token, nuevaContrasena: newPassword }
    ).pipe(
      catchError(error => throwError('Error al cambiar la contraseña'))
    );
  }

   // Método para registrar un usuario
   registrar(usuario: { correo: string; nombre_completo: string; contrasena: string }): Observable<any> {
    console.log('Enviando usuario al backend:', usuario);
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }
}

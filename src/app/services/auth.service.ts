import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/usuarios'; // URL de la API

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => throwError(() => new Error('Correo o contraseña incorrectos')))
    );
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  
}

export class AdminService {
  private apiUrl = 'http://localhost:8081/api/usuarios'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener la lista de usuarios
  obtenerUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`);
  }

  // Modificar el rol de un usuario a "adminSupremo"
  modificarRol(correo: string, rol: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificarRol`, { correo, rol });
  }

  // Eliminar un usuario por correo
  eliminarUsuario(correo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar?correo=${correo}`);
  }
}

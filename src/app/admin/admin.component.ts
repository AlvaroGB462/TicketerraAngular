import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../services/auth.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTableModule
  ],
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];  // Lista de usuarios
  errorMessage: string = '';  // Mensaje de error
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'rol', 'acciones'];  // Define las columnas que se mostrarán en la tabla

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  // Obtener la lista de usuarios
  obtenerUsuarios() {
    this.adminService.obtenerUsuarios().subscribe(
      (response) => {
        this.usuarios = response; // Asignar la lista de usuarios
      },
      (error) => {
        this.errorMessage = 'Error al obtener la lista de usuarios.';
      }
    );
  }

  // Modificar el rol de un usuario a "adminSupremo"
  cambiarRol(correo: string) {
    this.adminService.modificarRol(correo, 'adminSupremo').subscribe(
      (response) => {
        console.log(response);
        this.obtenerUsuarios(); // Recargar la lista de usuarios
      },
      (error) => {
        this.errorMessage = 'Error al cambiar el rol del usuario.';
      }
    );
  }

  // Eliminar un usuario
  eliminarUsuario(correo: string) {
    this.adminService.eliminarUsuario(correo).subscribe(
      (response) => {
        console.log(response);
        this.obtenerUsuarios(); // Recargar la lista de usuarios
      },
      (error) => {
        this.errorMessage = 'Error al eliminar el usuario.';
      }
    );
  }
}

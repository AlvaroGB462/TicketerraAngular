import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener este servicio para manejar la lógica del registro
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-registro',
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
        FormsModule
      ],
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registroForm = this.fb.group(
      {
        correo: ['', [Validators.required, Validators.email]],
        nombre_completo: ['', Validators.required],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasena: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator('contrasena', 'confirmarContrasena'),
      }
    );
  }

  passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registrarUsuario() {
    if (this.registroForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const usuario = this.registroForm.value;
    console.log('Usuario a registrar:', usuario);

    if (!usuario.nombre_completo) {
      console.error('El nombre completo es obligatorio');
      return;
    }

    // Encriptar la contraseña antes de enviarla
    const contrasenaEncriptada = bcrypt.hashSync(usuario.contrasena, 10);
    usuario.contrasena = contrasenaEncriptada;

    this.authService.registrar(usuario).subscribe(
      response => {
        console.log('Usuario registrado exitosamente', response);
        this.router.navigate(['/login']);  // Redirige al login
      },
      error => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }
}
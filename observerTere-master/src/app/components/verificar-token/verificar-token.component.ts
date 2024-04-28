import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Importa NgForm
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-token',
  templateUrl: './verificar-token.component.html',
  styleUrls: ['./verificar-token.component.css']
})
export class VerificarTokenComponent {
  constructor(private authService: AuthService, private router: Router) { }

  verificarToken(tokenForm: NgForm) {
    const token = tokenForm.value.token;
    this.authService.verificarTokenCorreo(token).subscribe(
      (response) => {
        console.log('Token de correo verificado correctamente');
        if (response.tokenSesion) {
          localStorage.setItem('token', response.tokenSesion);
          Swal.fire({
            title: "Inicio de sesión exitoso",
            icon: "success"
          });
          // Verificar el rol del usuario después de iniciar sesión
          const userRole = this.authService.obtenerRol();
          if (userRole === 'administrador') {
            this.router.navigate(['/inicio']);
          } else {
            this.router.navigate(['/inicio-usuario']);
          }
        } else {
          Swal.fire({
            title: "No se pudo",
            icon: "success"
          });
        }
      },
      (error) => {
        console.error('Error al verificar el token de correo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El token de verificación es inválido. Por favor, verifica el token e intenta nuevamente.',
        });
      }
    );
  }
}

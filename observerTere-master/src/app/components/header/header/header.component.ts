import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  darkMode: boolean = false;
  username: string = ''
  usuarioAutenticado: boolean = false;

  nombre: string = '';
  rolUsuario: string = ''; // Aquí declaramos la propiedad rolUsuario


  constructor(private authService: AuthService, private router: Router) {}

  cerrarSesion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Regresa pronto!",
          text: "ACTUNITY te desea un buen día",
          imageUrl: "../assets/cerrar-sesion.png",
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: "Custom image",
          showConfirmButton: false, // No mostrar el botón de confirmación
          timer: 1500 // Cerrar automáticamente después de 1.5 segundos
        });
        this.authService.cerrarSesion();
        this.router.navigate(['/signin']); // Redirige al usuario a la página de inicio de sesión
      }
    });
  }
  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }
    ngOnInit(): void {
    this.usuarioAutenticado = this.authService.estaAutenticado();
    this.username = this.authService.getUsername();
    if (this.usuarioAutenticado) {
      const datosUsuario = this.authService.obtenerDatosUser();
      if (datosUsuario) {
        this.nombre = datosUsuario.nombre;
        this.rolUsuario = datosUsuario.rol;
      }
    }
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  username: string = ''
  usuarioAutenticado: boolean = false;
  nombre: string = '';
  rolUsuario: string = ''; // Aquí declaramos la propiedad rolUsuario

  constructor(private authService: AuthService,  private router: Router) {}
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
  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
  
}

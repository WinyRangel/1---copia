import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimer: any; // Variable para almacenar el temporizador
  private sessionDuration: number = 3600000 ; // Duración de la sesión en milisegundos (1 minuto)
  private readonly alertTimeout: number = 30000; // 30 segundos

  constructor(private router: Router, private authService: AuthService) { }

  // Método para iniciar la sesión con un temporizador
  startSessionTimer(): void {
    this.sessionTimer = setTimeout(() => {
      this.handleSessionExpired();
    }, this.sessionDuration);
  }

  // Método para reiniciar el temporizador de sesión
  resetSessionTimer(): void {
    clearTimeout(this.sessionTimer); // Limpiar el temporizador actual
    this.startSessionTimer(); // Iniciar un nuevo temporizador
  }

  private handleSessionExpired(): void {
    let timeoutExpired = false;
  
    // Función para manejar el vencimiento del tiempo de la alerta
    const alertTimer = setTimeout(() => {
      timeoutExpired = true;
      Swal.close(); // Cerrar la alerta automáticamente
      this.authService.cerrarSesion(); // Cerrar sesión
      this.router.navigate(['/signin']); // Redirigir al inicio de sesión
    }, this.alertTimeout);
  
    Swal.fire({
      title: '¡Tu sesión ha caducado!',
      text: '¿Quieres continuar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      allowOutsideClick: false // Evitar que el usuario cierre la alerta haciendo clic fuera de ella
    }).then((result) => {
      clearTimeout(alertTimer); // Limpiar el temporizador de la alerta
      if (!timeoutExpired) { // Verificar si el tiempo de espera de la alerta ha expirado
        if (result.value) {
          // Si el usuario desea continuar la sesión, reiniciar el temporizador
          this.resetSessionTimer();
        } else {
          // Si el usuario no desea continuar la sesión, cerrar sesión y redirigirlo al inicio de sesión
          this.authService.cerrarSesion(); // Método para cerrar sesión en AuthService
          this.router.navigate(['/signin']); // Redirigir al usuario a la página de inicio de sesión
        }
      }
    });
  }
  // Método para extender la sesión manualmente
  extendSession(): void {
    this.resetSessionTimer(); // Reiniciar el temporizador al extender la sesión manualmente
  }
}

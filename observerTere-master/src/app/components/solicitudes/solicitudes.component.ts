import { Component } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { RecursoService } from 'src/app/services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  solicitudes: Solicitud[] = [];

  mostrarPendientes: boolean = false;
  mostrarAprobadas: boolean = false;
  mostrarRechazadas: boolean = false;

  mostrarDiv(opcion: string) {
    if (opcion === 'Pendientes') {
        this.mostrarPendientes = true;
        this.mostrarAprobadas = false;
        this.mostrarRechazadas = false;
    } else if (opcion === 'Aprobadas') {
        this.mostrarPendientes = false;
        this.mostrarAprobadas = true;
        this.mostrarRechazadas = false;
    } else if (opcion === 'Rechazadas') {
        this.mostrarPendientes = false;
        this.mostrarAprobadas = false;
        this.mostrarRechazadas = true;
    }
}

  constructor(private _recursoService: RecursoService, private toastr: ToastrService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.mostrarDiv('Pendientes');
    this.sessionService.startSessionTimer();

  }

  obtenerSolicitudes() {
    this._recursoService.obtenerSolicitudes().subscribe(data => {
      console.log(data);
      this.solicitudes = data;
    }, error => {
      console.log(error)
    })
    }
  
  // Función para aprobar una solicitud
  aprobarSolicitud(solicitud: Solicitud) {
    this._recursoService.aprobarSolicitud(solicitud).subscribe(
      (response) => {
        Swal.fire({
          icon: "success",
          title: "Aprobada",
          text: "Solicitud aprobada con éxito",
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: "question",
          title: "Error...",
          text: "Hubo un error en el servidor.",
        });
      }
    );
  }

  actualizarFechaEntrega(solicitud: Solicitud) {
    this._recursoService.actualizarFechaEntrega(solicitud).subscribe(
      (response) => {
        // Manejar la respuesta del servidor, si es necesario
        console.log('Fecha de entrega actualizada exitosamente');
      },
      (error) => {
        console.error('Error al actualizar la fecha de entrega:', error);
        // Manejar errores, si es necesario
      }
    );
  }
  
  

  }

import { EditRecursoComponent } from './../edit-recurso/edit-recurso.component';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { RecursoService } from 'src/app/services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SessionService } from 'src/app/services/session.service';
import { data } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  modalAbierto: boolean = false;
  comentarioRechazoForm: FormGroup; // Define el FormGroup para el formulario en el modal

  
  solicitudes: Solicitud[] = [];

  mostrarPendientes: boolean = false;
  mostrarAprobadas: boolean = false;
  mostrarRechazadas: boolean = false;

  recursoForm: FormGroup;
  titulo = 'Crear recurso';
  id: string | null;

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

  constructor(private _recursoService: RecursoService, private toastr: ToastrService, private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.comentarioRechazoForm = this.fb.group({
      comentarioRechazo: ['', Validators.required]
  });

    this.recursoForm = this.fb.group({
      idRecurso: ['', ],
      numSerie: ['',Validators.required],
      recurso: ['',Validators.required],
      marca: ['',Validators.required],
      modelo: ['',Validators.required],
      estatus: ['', ],
      posesion: ['', ],
      nomEmpresa: ['', ],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
   }

   nombrePosesion: string = ''; 

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.mostrarDiv('Pendientes');
    this.sessionService.startSessionTimer();

    // Obtener datos del usuario y asignar el nombre
    const userData = this.authService.obtenerDatosUser();
    if (userData) {
      this.nombrePosesion = userData.nombre;
    }


  }

  obtenerSolicitudes() {
    const usuario = this.authService.obtenerDatosUser(); // Obtén los datos del usuario autenticado
    if (usuario) {
      // Verifica si el usuario tiene la empresa "actunity"
      if (usuario.nomEmpresa === 'actunity') {
        this._recursoService.obtenerSolicitudes().subscribe(data => {
          console.log("Datos de solicitudes:", data);
          console.log(data);
          for (let solicitud of data) {
            if (solicitud.idRecurso !== undefined) { // Verificar si idRecurso no es undefined
              this._recursoService.obtenerRecurso(solicitud.idRecurso.toString()).subscribe(recurso => {
                // Agregar el ID del recurso a la solicitud
                console.log("Datos del recurso:", recurso);
    
                if (recurso) {
                  solicitud.idRecurso = recurso.id;
                }
              });
            }
          }
          this.solicitudes = data;
        }, error => {
          console.log(error)
        })
      } else {
        this._recursoService.obtenerSolicitudes().subscribe(data => {
          console.log("Datos de solicitudes:", data);
          console.log(data);
          for (let solicitud of data) {
            if (solicitud.idRecurso !== undefined) { // Verificar si idRecurso no es undefined
              this._recursoService.obtenerRecurso(solicitud.idRecurso.toString()).subscribe(recurso => {
                // Agregar el ID del recurso a la solicitud
                console.log("Datos del recurso:", recurso);
    
                if (recurso) {
                  solicitud.idRecurso = recurso.id;
                }
              });
            }
          }
          this.solicitudes = data.filter((solicitud: Solicitud) => solicitud.nomEmpresa === usuario.nomEmpresa);
        }, error => {
          console.log(error)
        })
      }
    } else {
      console.log('Usuario no autenticado');
    }
    
}

  // Función para aprobar una solicitud
  aprobarSolicitud(solicitud: Solicitud) {
    console.log('Aprobando solicitud:', solicitud);
    this._recursoService.aprobarSolicitud(solicitud).subscribe(
      (response) => {
        console.log('Solicitud aprobada con éxito:', response);
        Swal.fire({
          icon: "success",
          title: "Aprobada",
          text: "Solicitud aprobada con éxito",
        });

        // Obtener el número de serie del recurso asociado a la solicitud aprobada
        const numSerie = solicitud.numSerie;
        console.log('Número de serie del recurso:', numSerie);
        console.log('posiscion:', this.nombrePosesion);

        // Actualizar el campo de posesión del recurso en la base de datos
        this._recursoService.editarPosesionRecurso(numSerie, this.nombrePosesion).subscribe(
          (response) => {
            console.log('Campo de posesión del recurso actualizado con éxito:', response);
          },
          (error) => {
              console.error('Error al actualizar el campo de posesión del recurso:', error);
          }
        );
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

  selectedSolicitudId: string = ''; 

  guardarComentarioRechazo() {
    if (this.comentarioRechazoForm) { // Verificar que comentarioRechazoForm no sea null
      const comentarioRechazoControl = this.comentarioRechazoForm.get('comentarioRechazo');
      if (comentarioRechazoControl) { // Verificar que comentarioRechazoControl no sea null
        const comentarioRechazo = comentarioRechazoControl.value;
        if (comentarioRechazo && this.selectedSolicitudId) {
          this._recursoService.rechazarSolicitud(this.selectedSolicitudId, comentarioRechazo).subscribe(
            (response) => {
              Swal.fire({
                icon: "success",
                title: "Rechazada",
                text: "Solicitud rechazada con éxito",
              });
              // Aquí podrías actualizar la lista de solicitudes u otras acciones necesarias después de rechazar la solicitud
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
        } else {
          Swal.fire({
            icon: "warning",
            title: "Error",
            text: "Por favor, proporciona un comentario de rechazo",
          });
        }
      }
    } else {
      console.error('El formulario de comentario de rechazo no se inicializó correctamente');
    }
  }
  

  openModalRechazo(solicitud: Solicitud) {
    if (solicitud && solicitud._id) {
      console.log('Abriendo modal para solicitud:', solicitud);
      // Convierte el ID de la solicitud a una cadena
      this.selectedSolicitudId = solicitud._id.toString();
      // Abre el modal de rechazo
      this.modalAbierto = true;
    } else {
      console.error('El ID de la solicitud es inválido');
    }
  }
  
  
  

  }

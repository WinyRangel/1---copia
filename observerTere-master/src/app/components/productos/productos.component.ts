import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { Solicitud } from 'src/app/models/solicitud';
import { RecursoService } from 'src/app/services/recurso.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  solicitudForm: FormGroup;
  listRecursos: Recurso[] = [];
  usuarios: {nombre: string}[] = []
  recursosFiltrados: Recurso[] = []; // Declara la propiedad recursosFiltrados
  filterPost = '';
  id: string | null;
  filter: string = '';
  empleadoNombre: string = ''; 
  empresaNombre: string = ''; 

  constructor(private fb: FormBuilder,private _recursoService: RecursoService, private toastr: ToastrService, private aRouter:ActivatedRoute, private router: Router, private sessionService: SessionService,
    private _authService: AuthService
  ) {
    
    this.solicitudForm = this.fb.group ({
      nombre: ['', ],
      recurso: ['', Validators.required],
      comentariosolicitud: ['', Validators.required],
      numSerie: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.obtenerRecursos();
    this.loadEmpleados();
    this.sessionService.startSessionTimer();
    
      // Obtener datos del usuario y asignar el nombre
    const userData = this._authService.obtenerDatosUser();
    if (userData) {
      this.empleadoNombre = userData.nombre;
      this.empresaNombre = userData.nomEmpresa;
    }

    this._authService.obtenerDatosUser(); 
  }


  loadEmpleados() {
    this._authService.getUsuarios().subscribe(
      (usuarios: { nombre: string }[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  seleccionarRecurso(recurso: Recurso): void {
    // Llena el formulario de solicitud con los datos del recurso seleccionado
    this.solicitudForm.patchValue({
        recurso: recurso.recurso,
        marca: recurso.marca,
        numSerie: recurso.numSerie,
    });
}

  obtenerRecursos() {
    const usuario = this._authService.obtenerDatosUser(); // Obtén los datos del usuario autenticado
    if (usuario) {
      // Verifica si el usuario tiene la empresa "actunity"
      if (usuario.nomEmpresa === 'actunity') {
        // Si el usuario tiene la empresa "actunity", obtén todos los recursos sin filtrar
        this._recursoService.getRecursos().subscribe(data => {
          console.log(data);
          this.listRecursos = data;
        }, error => {
          console.log(error);
        });
      } else {
        // Si el usuario no tiene la empresa "actunity", filtra los recursos por su empresa
        this._recursoService.getRecursos().subscribe(data => {
          console.log(data);
          this.listRecursos = data.filter((recurso: Recurso) => recurso.nomEmpresa === usuario.nomEmpresa);
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  solicitarRecurso(){
    const SOLICITUD: Solicitud = {
      nombre: this.empleadoNombre,
      recurso: this.solicitudForm.get('recurso')?.value,
      estado: 'En revisión', // Estado inicial
      comentariosolicitud: this.solicitudForm.get('comentariosolicitud')?.value,
      numSerie: this.solicitudForm.get('numSerie')?.value,
      comentarioRechazo: this.solicitudForm.get('comentarioRechazo')?.value,
      nomEmpresa: this.empresaNombre,
      marca: this.solicitudForm.get('marca')?.value,
      posesion: this.solicitudForm.get('posesion')?.value,
    }
    this._recursoService.solicitarRecurso(SOLICITUD).subscribe(
      (response) => {
        // Manejar la respuesta exitosa
        console.log(SOLICITUD);
        Swal.fire({
          icon: "success",
          title: "Tu solicitud ha sido enviada con éxito, revisaremos tu solicitud",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        // Manejar el error
        console.error(SOLICITUD);
        this.toastr.error('Hubo un error al enviar la solicitud');
      }
    );
  }
}

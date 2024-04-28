import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { Solicitud } from 'src/app/models/solicitud';
import { EmpleadoService } from 'src/app/services/empleado.service';
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
  empleados: {nombre: string}[] = []
  recursosFiltrados: Recurso[] = []; // Declara la propiedad recursosFiltrados
  filterPost = '';
  id: string | null;
  filter: string = '';


  constructor(private fb: FormBuilder,private _recursoService: RecursoService, private toastr: ToastrService, private _empleadoService: EmpleadoService, private aRouter:ActivatedRoute, private router: Router, private sessionService: SessionService) {
    
    this.solicitudForm = this.fb.group ({
      nombre: ['', Validators.required],
      recurso: ['', Validators.required],
      comentario: ['', Validators.required],
      numSerie: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.obtenerRecursos();
    this.loadEmpleados();
    this.sessionService.startSessionTimer();

  }

  loadEmpleados() {
    this._empleadoService.getEmpleados().subscribe(
      (empleados: { nombre: string }[]) => {
        this.empleados = empleados;
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
    this._recursoService.getRecursos().subscribe(data => {
      console.log(data);
      this.listRecursos = data;
    }, error => {
      console.log(error);
    })
  }
  solicitarRecurso(){
    const SOLICITUD: Solicitud = {
      nombre: this.solicitudForm.get('nombre')?.value,
      recurso: this.solicitudForm.get('recurso')?.value,
      estado: 'En revisión', // Estado inicial
      comentario: this.solicitudForm.get('comentario')?.value,
      numSerie: this.solicitudForm.get('numSerie')?.value,
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

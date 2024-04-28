import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { Solicitud } from 'src/app/models/solicitud';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {
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
  
    
}

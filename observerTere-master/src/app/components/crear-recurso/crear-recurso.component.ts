import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent {
  recursoForm: FormGroup;
  titulo = 'Crear recurso';

  id: string | null;
  marcas: { nombre: string }[] = []; 
  gamas: { tipo: string }[] = []; 

  constructor(private authService: AuthService, private fb: FormBuilder, private sessionService: SessionService,
    private router: Router,
    private toastr: ToastrService,
    private _recursoService: RecursoService,
    private aRouter: ActivatedRoute
    ) {
    this.recursoForm = this.fb.group({
      recurso: ['',Validators.required],
      marca: ['',Validators.required],
      gama: ['',],
      estatus: ['', ],
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  empresaNombre: string = ''; 

  ngOnInit(): void {
    this.esEditar();
    this.loadMarcas();
    this.loadGama();
    this.sessionService.startSessionTimer();

      // Obtener datos del usuario y asignar el nombre
      const userData = this.authService.obtenerDatosUser();
      if (userData) {
        this.empresaNombre = userData.nomEmpresa;
      }

  }
  loadMarcas() {
    this._recursoService.obtenerMarca().subscribe(
      (marcas: { nombre: string }[]) => {
        this.marcas = marcas;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  loadGama() {
    this._recursoService.obtenerGama().subscribe(
      (gamas: { tipo: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.gamas = gamas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  agregarRecurso(): void {
    console.log(this.recursoForm)

    console.log(this.recursoForm.get('numSerie')?.value);
    const valorPorDefectoEstatus = 'Sin Problemas';
    const valorPorDefectoEstado = 'En almacén';
    const valorPorDefectoComentarios = 'Sin comentarios';
    const valorPorDefectoPosesion = 'Empresa';
    const RECURSO: Recurso = {
      recurso: this.recursoForm.get('recurso')?.value,
      marca: this.recursoForm.get('marca')?.value,
      gama: this.recursoForm.get('gama')?.value,
      estatus: valorPorDefectoEstatus,
      estado: valorPorDefectoEstado,
      nomEmpresa: this.empresaNombre,
      comentarios: valorPorDefectoComentarios,
      posesion: valorPorDefectoPosesion
    }

    if(this.id !== null){
      //editar recurso;
    this._recursoService.editarRecurso(this.id, RECURSO).subscribe(data => {
      this.toastr.info('El recurso fue actualizado con éxito', 'Recurso Actualizado');
      this.router.navigate(['/listar-recurso']);
    }, error => {
      console.log(error);
      this.recursoForm.reset();
    })
    }else{
      //agregar recurso
      console.log(RECURSO);
      this._recursoService.guardarRecurso(RECURSO).subscribe(data => {
        this.toastr.success('El recurso fue registrado con éxito', 'Recurso Registrado');
        this.router.navigate(['/listar-recurso']);
      }, error => {
        console.log(error);
        this.recursoForm.reset();
      })
    }

  }


  
  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar Recurso';
      this._recursoService.obtenerRecurso(this.id).subscribe(data => {
        this.recursoForm.setValue({
          numSerie: data.numSerie,
          recurso: data.recurso,
          marca: data.marca,
          gama: data.gama,
          estatus: data.estatus,
        })
      })
    }
  }


}




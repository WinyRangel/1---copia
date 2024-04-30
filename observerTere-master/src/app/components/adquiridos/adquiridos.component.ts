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
  selector: 'app-adquiridos',
  templateUrl: './adquiridos.component.html',
  styleUrls: ['./adquiridos.component.css']
})
export class AdquiridosComponent {
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
      recurso: ['', ],
        marca: ['', ],
        gama: ['', ],
        estatus: ['', ],
        estado: ['', ],
        nomEmpresa: ['', ],
        comentarios: ['', ],
        posesion: ['', ],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.esEditar();
    this.obtenerRecursos();
    this.sessionService.startSessionTimer();
    
      // Obtener datos del usuario y asignar el nombre
    const userData = this._authService.obtenerDatosUser();
    if (userData) {
      this.empleadoNombre = userData.nombre;
      this.empresaNombre = userData.nomEmpresa;
    }
    this._authService.obtenerDatosUser(); 


  }




selectedResourceId: string | null = null;

setSelectedResourceId(id: any) {
  this.id = id;
  console.log('Selected Resource ID id :', this.id);
  this.esEditar(); 
}


agregarRecurso(): void {
  console.log('Selected Resource ID:', this.id);
  console.log('Selected Resource ID:', this.selectedResourceId);
    console.log('Form Value:', this.solicitudForm.value);


  const valorPorDefectoEstado = 'En almacén';
  const valorPorDefectoPosesion = 'Empresa';
  const valorPorDefectoEstatus = 'Sin Problemas';
  const RECURSO: Recurso = {
    recurso: this.solicitudForm.get('recurso')?.value,
    marca: this.solicitudForm.get('marca')?.value,
    gama: this.solicitudForm.get('gama')?.value,
    estatus: valorPorDefectoEstatus,
    estado: valorPorDefectoEstado,
    nomEmpresa:  this.solicitudForm.get('nomEmpresa')?.value,
    comentarios:  this.solicitudForm.get('comentarios')?.value,
    posesion: valorPorDefectoPosesion
  }

  if(this.id !== null){
    //editar recurso;
    console.log('Resource to Update:', RECURSO);
  this._recursoService.editarRecurso(this.id, RECURSO).subscribe(data => {
    console.log('Response from Server:', data);
    this.toastr.info('El recurso fue devuelto con éxito', 'Recurso Devuelto');
    this.router.navigate(['/adquiridos']);
    this.obtenerRecursos();
  }, error => {
    console.log(error);
    this.solicitudForm.reset();
  })
  }

}

esEditar() {

  if(this.id !== null) {
    this._recursoService.obtenerRecurso(this.id).subscribe(data => {
      this.solicitudForm.patchValue({
        recurso: data.recurso,
        marca: data.marca,
        gama: data.gama,
        estatus: data.estatus,
        estado: data.estado,
        nomEmpresa: data.nomEmpresa,
        comentarios: data.comentarios,
      })
    })
  }
}





  obtenerRecursos() {
    const usuario = this._authService.obtenerDatosUser(); // Obtén los datos del usuario autenticado
    if (usuario) {
      // Verifica si el usuario tiene la empresa "actunity"
      if (usuario.nomEmpresa === 'actunity') {
        // Si el usuario tiene la empresa "actunity", obtén todos los recursos sin filtrar
        this._recursoService.getRecursos().subscribe(data => {
          console.log(data);
          this.listRecursos = data.filter((recurso: Recurso) => recurso.posesion === usuario.nombre);
        }, error => {
          console.log(error);
        });
      } else {
        // Si el usuario no tiene la empresa "actunity", filtra los recursos por su empresa
        this._recursoService.getRecursos().subscribe(data => {
          console.log(data);
          this.listRecursos = data.filter((recurso: Recurso) => recurso.nomEmpresa === usuario.nomEmpresa && recurso.posesion === usuario.nombre);
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }
}

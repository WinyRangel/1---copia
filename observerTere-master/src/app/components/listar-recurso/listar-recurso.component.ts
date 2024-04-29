import { Component, OnInit } from '@angular/core';
import { RecursoService } from './../../services/recurso.service';
import { ToastrService } from 'ngx-toastr';
import { Recurso } from 'src/app/models/recurso';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-recurso',
  templateUrl: './listar-recurso.component.html',
  styleUrls: ['./listar-recurso.component.css']
})
export class ListarRecursoComponent implements OnInit{
  mostrarSinFallos: boolean = false;
  mostrarConFallos: boolean = false;

  mostrarDiv(opcion: string) {
      if (opcion === 'SinFallos') {
          this.mostrarSinFallos = true;
          this.mostrarConFallos = false;
      } else if (opcion === 'ConFallos') {
          this.mostrarSinFallos = false;
          this.mostrarConFallos = true;
      }
  }



listRecursos: Recurso[] = [];

filterPost = '';

filter: string = '';

constructor(private _recursoService: RecursoService, private toastr: ToastrService, private sessionService: SessionService,  private authService: AuthService) {}

ngOnInit(): void {
  this.obtenerRecursos();
  this.mostrarDiv('SinFallos');
  this.sessionService.startSessionTimer();

  this.authService.obtenerDatosUser(); 

}

obtenerRecursos() {
  const usuario = this.authService.obtenerDatosUser(); // Obtén los datos del usuario autenticado
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


eliminarRecurso(id:any) {
  this._recursoService.eliminarRecurso(id).subscribe(data => {
    this.toastr.error('El recurso fue eliminado con exito');
    this.obtenerRecursos();
  }, error=> {
     console.log(error);
  } )
}

}

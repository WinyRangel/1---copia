import { Component } from '@angular/core';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-agregar-recurso',
  templateUrl: './agregar-recurso.component.html',
  styleUrls: ['./agregar-recurso.component.css']
})
export class AgregarRecursoComponent {
  nuevoTipo: any = {};

  constructor(private recursoService: RecursoService) { }

  registrarTipo() {
    this.recursoService.registrarTipo(this.nuevoTipo).subscribe(
      respuesta => {
        console.log('Tipo de recurso registrado exitosamente:', respuesta);
      },
      error => {
        console.error('Error al registrar tipo de recurso:', error);
      }
    );
  }
}

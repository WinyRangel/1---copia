import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  usuarios: any[] = [];

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getUsuarioEmpresa().subscribe(
      (data) => {
        this.usuarios = data.usuarios; // Ajusta esto según la estructura de tu respuesta API
      },
      (error) => {
        console.error(error);
      }
    );
  }

}

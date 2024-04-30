import { Component } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { RecursoService } from 'src/app/services/recurso.service';


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  listProveedores: Proveedor [] = [];
  filterProveedor = '';
  
  empleadoNombre: string = ''; 
  empresaNombre: string = ''; 

  constructor(private proveedorService: ProveedorService,private _recursoService: RecursoService, private sessionService: SessionService,  private _authService: AuthService) { }



  ngOnInit(): void {
    this.obtenerProveedor();
    this.sessionService.startSessionTimer();

        // Obtener datos del usuario y asignar el nombre
        const userData = this._authService.obtenerDatosUser();
        if (userData) {
          this.empleadoNombre = userData.nombre;
          this.empresaNombre = userData.nomEmpresa;
        }
    
        this._authService.obtenerDatosUser(); 

  }

  obtenerProveedor() {
    const usuario = this._authService.obtenerDatosUser(); // Obtén los datos del usuario autenticado
    if (usuario) {
      // Verifica si el usuario tiene la empresa "actunity"
      if (usuario.nomEmpresa === 'actunity') {
        this.proveedorService.getProveedores().subscribe(data => {
          console.log(data);
          this.listProveedores = data;
        }, error => {
          console.log(error);
        })
      } else {
        // Si el usuario no tiene la empresa "actunity", filtra los recursos por su empresa
        this.proveedorService.getProveedores().subscribe(data => {
          console.log(data);
          this.listProveedores = data.filter((provedor: Proveedor) => provedor.nomEmpresa === usuario.nomEmpresa);
        }, error => {
          console.log(error);
        })
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  eliminarProveedor(id: any) {
    Swal.fire({
      title: "¿Estás seguro de querer eliminar a este proveedor?",
      text: "Esta acción no puede ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro."
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para eliminar al proveedor si el usuario confirma
        this.proveedorService.eliminarProveedor(id).subscribe(
          data => {
            Swal.fire({
              title: "Eliminado",
              text: "Este proveedor ha sido eliminado.",
              icon: "success"
            });
            // Actualizar la lista de proveedores después de eliminar uno
            this.obtenerProveedor();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  
}
import { Component } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  listProveedores: Proveedor [] = [];
  filterProveedor = '';
  

  constructor(private proveedorService: ProveedorService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.obtenerProveedor();
    this.sessionService.startSessionTimer();

  }

  obtenerProveedor() {
    this.proveedorService.getProveedores().subscribe(data => {
      console.log(data);
      this.listProveedores = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProveedor(id: any) {
    this.proveedorService.eliminarProveedor(id).subscribe(
      data => {
        Swal.fire({
          title: "¿Estás seguro de querer eliminar a este empleado?",
          text: "Esta acción no puede ser revertidad",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, estoy seguro."
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado",
              text: "Este empleado ha sido eliminado.",
              icon: "success"
            });
          }
        });
        this.obtenerProveedor();
      },
      error => {
        console.log(error);
      }
    );
  }
  }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
    pedidoForm: FormGroup;
    proveedores: {nombre: string}[] = [];
    productos: {nombre: string }[] = [];
    producto: {nombre: string }[] = [];

    constructor(private fb: FormBuilder, 
      private router: Router,
      private _proveedorService: ProveedorService, private _pedidoService: PedidoService, private aRouter: ActivatedRoute, private sessionService: SessionService) {
      this.pedidoForm = this.fb.group({
        proveedor: ['', Validators.required],
        producto: ['', Validators.required],
        cantidad: ['', Validators.required]
      });
    }
    ngOnInit(): void{
      this.loadProveedors();
      this.loadProducts();
      this.loadProductos();
      this.sessionService.startSessionTimer();

    }

    loadProveedors() {
      this._proveedorService.getProveedores().subscribe(
        (proveedores: { nombre: string }[]) => {
          // Actualiza las opciones de departamento en el formulario
          this.proveedores = proveedores;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    loadProducts() {
      this._pedidoService.obtenerProducto().subscribe(
        (productos: { nombre: string }[]) => {
          // Actualiza las opciones de departamento en el formulario
          this.productos = productos;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    loadProductos() {
      this._pedidoService.obtenerProductos().subscribe(
        (producto: { nombre: string }[]) => {
          // Actualiza las opciones de departamento en el formulario
          this.producto = producto;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    realizarPedido(): void {
      if (this.pedidoForm.valid) {
        const PEDIDO: Pedido = {
          proveedor: this.pedidoForm.get('proveedor')?.value,
          producto: this.pedidoForm.get('producto')?.value,
          cantidad: this.pedidoForm.get('cantidad')?.value,
        };
    
        this._pedidoService.realizarPedido(PEDIDO).subscribe(
          (response) => {
            // Manejar la respuesta del servidor correctamente
            alert('Pedido realizado con éxito');
            this.router.navigate(['/proveedores']);
          },
          (error) => {
            console.error('Error al realizar el pedido:', error);
            alert('Error al realizar el pedido');
          }
        );
      } else {
        console.log('El formulario no es válido');
      }
    }
    
}
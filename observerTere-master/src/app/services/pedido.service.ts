import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:4000/api/proveedor'; // URL base del backend
  private baseUrl1 = 'http://localhost:4000/api/proveedor/producto';
  private baseUrl2  = 'http://localhost:4000/api/proveedor/realizarPedido'
  constructor(private http: HttpClient) { }


  obtenerProveedor(): Observable<{ proveedor: string }[]> {
    return this.http.get<{ proveedor: string }[]>(this.baseUrl);
  }
  obtenerProductos(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string }[]>(this.baseUrl);
  }
  
  obtenerProducto(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string }[]>(this.baseUrl1);
  }

  realizarPedido(pedido : Pedido): Observable<any>{
    return this.http.post(this.baseUrl2, pedido);
  }
}

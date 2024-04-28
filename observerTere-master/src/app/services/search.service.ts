import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  items: any[] = [
    { nombre: 'Inicio', ruta: '/inicio' },
    { nombre: 'Empleados', ruta: '/listar-empleados' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Recursos', ruta: '/listar-recurso' },
    { nombre: 'Proveedores', ruta: '/proveedores' },
    { nombre: 'Proveedor', ruta: '/proveedores' },
    { nombre: 'Contacto', ruta: '/contacto' },
    { nombre: 'Almácen', ruta: '/listar-recurso' },
    { nombre: 'Solicitudes', ruta: '/solicitudes' },
    { nombre: 'Registro', ruta: '/registro' },
    { nombre: 'Conocenos', ruta: '/conocenos' },
    { nombre: 'Conocer', ruta: '/conocenos' },
    { nombre: 'Nosotros', ruta: '/nosotros' },
    { nombre: 'conocenos', ruta: '/nosotros' },
    { nombre: 'Pedido', ruta: '/pedido' },
    { nombre: 'Solicitar', ruta: '/solicitudes' },
  ]; // Lista de elementos a buscar

  constructor() { }

  // Método para filtrar los elementos según el término de búsqueda
  filterItems(searchTerm: string): any[] {
    // Filtra los elementos que coincidan con el término de búsqueda
    const filteredItems = this.items.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems;
  }
}

export class SearchService2 {
  items: any[] = [
    { nombre: 'Inicio', ruta: '/inicio' },
    { nombre: 'Empleados', ruta: '/listar-empleados' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Recursos', ruta: '/listar-recurso' },
    { nombre: 'Proveedores', ruta: '/proveedores' },
    { nombre: 'Proveedor', ruta: '/proveedores' },
    { nombre: 'Contacto', ruta: '/contacto' },
    { nombre: 'Almácen', ruta: '/listar-recurso' },
    { nombre: 'Solicitudes', ruta: '/solicitudes' },
    { nombre: 'Registro', ruta: '/registro' },
    { nombre: 'Recurso', ruta: '/listar-recurso' },
    { nombre: 'Contacto', ruta: '/contacto' },
    { nombre: 'Almácen', ruta: '/listar-recurso' },
    { nombre: 'Solicitudes', ruta: '/solicitudes' },
    { nombre: 'Registro', ruta: '/registro' },
    { nombre: 'Conocenos', ruta: '/conocenos' },
    { nombre: 'Conocer', ruta: '/conocenos' },
    { nombre: 'Nosotros', ruta: '/nosotros' },
    { nombre: 'conocenos', ruta: '/nosotros' },
    { nombre: 'Pedido', ruta: '/pedido' },
    { nombre: 'Solicitar', ruta: '/solicitudes' },
  ]; // Lista de elementos a buscar

  constructor() { }

  // Método para filtrar los elementos según el término de búsqueda
  filterItems(searchTerm: string): any[] {
    // Filtra los elementos que coincidan con el término de búsqueda
    const filteredItems = this.items.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredItems;
  }
}

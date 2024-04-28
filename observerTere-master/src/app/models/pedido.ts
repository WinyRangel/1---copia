export class Pedido {
    _id?: number;
    proveedor: string;
    producto: string;
    cantidad: number;


    constructor(idProveedor: number, proveedor: string, productos: string, cantidad: number, categoria: string, telefono: number, direccion: string, email: string){
        this.proveedor = proveedor;
        this.producto = productos;
        this.cantidad = cantidad;
    }
}

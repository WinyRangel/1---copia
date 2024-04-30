export class Proveedor {
    _id?: number;
    nombre: string;
    direccion: string;
    categoria: string;
    productos: string;
    email: string;
    telefono: Number;
    nomEmpresa: string;

    constructor(nombre: string, direccion: string, categoria: string, productos: string, ciudad: string, telefono:Number, email:string, nomEmpresa: string){
        this.nombre = nombre;
        this.direccion = direccion;
        this.categoria = categoria;
        this.email = email;
        this.productos = productos;
        this.telefono = telefono;
        this.nomEmpresa = nomEmpresa;

    }
}
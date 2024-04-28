export class Empresa {
    _id?: number;
    nomEmpresa: string;
    direccion: string;
    email: string;
    telefono: number;


    constructor(idProveedor: number, nomEmpresa: string, email: string, cantidad: number, categoria: string, telefono: number, direccion: string){
        this.nomEmpresa = nomEmpresa;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
    }
}

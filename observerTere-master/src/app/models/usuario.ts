export class Usuario {
    _id?: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    nomEmpresa: string;

    constructor(nombre: string, apellido: string, estado: string, ciudad: string, nomEmpresa:string, puesto: string,gerente: string, email: string, telefono: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.nomEmpresa = nomEmpresa;
    }
}
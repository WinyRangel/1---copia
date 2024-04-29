export class Usuario {
    _id?: number;
    nombre: string;
    apellido: string;
    //telefono: string;
    email: string;
    nomEmpresa: string;
    rfc: string;
    username: string;
    password: string;
    validado: boolean;

    constructor(nombre: string, apellido: string, estado: string, ciudad: string, nomEmpresa:string, puesto: string,gerente: string, email: string, telefono: string,
        rfc: string,
    username: string,
    password: string, validado: boolean
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        //this.telefono = telefono;
        this.nomEmpresa = nomEmpresa;
        this.rfc = rfc;
        this.username = username;
        this.password = password;
        this.validado = validado;
    }
}
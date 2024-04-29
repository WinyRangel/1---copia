export class Recurso{
    _id?: number;
    numSerie?: number;
    recurso: String;
    marca: String;
    gama: String;
    estatus: string;
    estado: string;
    nomEmpresa: string;
    comentarios: string;
    posesion: string;


    constructor(recurso: string, marca: string, gama: string, estatus: string, asignadoA: string, estado: string, nomEmpresa: string, comentarios: string, posesion: string){

        this.recurso = recurso;
        this.marca = marca;
        this.gama = gama;
        this.estatus = estatus;
        this.estado = estado;
        this.nomEmpresa = nomEmpresa;
        this.comentarios = comentarios;
        this.posesion = posesion;
    }
}

export class Recurso{
    _id?: number;
    numSerie?: number;
    recurso: String;
    marca: String;
    gama: String;
    estatus: string;
    estado: string;


    constructor(recurso: string, marca: string, gama: string, estatus: string, asignadoA: string, estado: string){

        this.recurso = recurso;
        this.marca = marca;
        this.gama = gama;
        this.estatus = estatus;
        this.estado = estado;
    }
}

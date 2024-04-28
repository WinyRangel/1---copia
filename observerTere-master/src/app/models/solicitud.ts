export class Solicitud {
    _id?: number;
    nombre: string;
    recurso: string;
    numSerie: string;
    estado: string;
    fechaEntrega?:Date;
    comentario: string;

    constructor(nombre: string, recurso: string, comentario: string, estado: string, _id: string, fechaEntrega: Date, numSerie: string) {
        this.nombre = nombre;
        this.recurso = recurso;
        this.comentario = comentario;
        this.fechaEntrega = fechaEntrega;
        this.estado = estado;
        this.numSerie = numSerie;
    }

}

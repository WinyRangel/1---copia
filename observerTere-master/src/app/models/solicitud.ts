export class Solicitud {
    _id?: number;
    nombre: string;
    recurso: string;
    numSerie: string;
    estado: string;
    fechaEntrega?:Date;
    fechaSolicitud?:Date;
    comentariosolicitud: string;
    comentarioRechazo: string;
    nomEmpresa: string;
    marca: string;
    posesion: string;
    idRecurso?: number;
    idUsuario?: number;


    constructor(nombre: string, recurso: string,  estado: string, _id: string, fechaEntrega: Date, numSerie: string, comentariosolicitud: string, comentarioRechazo: string, nomEmpresa: string, marca: string, posesion: string, idRecurso: number, idUsuario: number, fechaSolicitud:Date) {
        this.nombre = nombre;
        this.recurso = recurso;
        this.fechaEntrega = fechaEntrega;
        this.estado = estado;
        this.numSerie = numSerie;
        this.comentarioRechazo = comentarioRechazo;
        this.comentariosolicitud = comentariosolicitud;
        this.nomEmpresa = nomEmpresa;
        this.marca = marca;
        this.posesion = posesion;
        this.idUsuario = idUsuario;
        this.idRecurso = idRecurso;
        this.fechaSolicitud = fechaSolicitud;
    }

}

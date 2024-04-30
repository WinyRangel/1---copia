import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Recurso } from '../models/recurso';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  url = 'http://localhost:4000/api/recursos/';
  url2 = 'http://localhost:4000/api/marca/';
  url3 = 'http://localhost:4000/api/gama/';
  url4 = 'http://localhost:4000/api/recursos/obtenerSolicitudes';
  url5 = 'http://localhost:4000/api/recursos/obtenerSolicitudesId';
  url6 = 'http://localhost:4000/api/recursos/tipo';

  constructor(private http: HttpClient) { }

  getRecursos(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarRecurso(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarRecurso(vrecurso: Recurso): Observable<any> {
    return this.http.post(this.url, vrecurso);
  }

  registrarTipo(tipo: any): Observable<any> {
    return this.http.post<any>(`${this.url6}`, tipo);
  }

  // Método para obtener todos los tipos de recursos
  obtenerTipos(): Observable<any> {
    return this.http.get<any>(`${this.url6}`);
  }

  obtenerRecurso(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarRecurso(id: string, vrecurso: Recurso): Observable<any> {
    return this.http.put(this.url + id, vrecurso);
  }
  obtenerMarca(): Observable<{ nombre: string }[]> {
    return this.http.get<{ nombre: string }[]>(this.url2);
  }
  obtenerGama(): Observable<{ tipo: string }[]> {
    return this.http.get<{ tipo: string }[]>(this.url3);
  }
  solicitarRecurso(solicitud: Solicitud): Observable<any> {
    return this.http.post(this.url + 'solicitar', solicitud);
  }
  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.url4);
  }
  aprobarSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.put(`${this.url}/${solicitud._id}/aprobar`, solicitud);
  }
  actualizarFechaEntrega(solicitud: Solicitud): Observable<any> {
    const url = `${this.url}/${solicitud._id}/aprobar`; // Ajusta la URL según la estructura de tu API
    return this.http.put<any>(url, { fechaEntrega: solicitud.fechaEntrega });
  }  

  rechazarSolicitud1(solicitud: Solicitud): Observable<any> {
    return this.http.put(`${this.url}/${solicitud._id}/rechazar`, solicitud);
  }

  editarSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.put(`${this.url}/${solicitud._id}/editar`, solicitud);
  }

  rechazarSolicitud(solicitudId: string, comentarioRechazo: string): Observable<any> {
    return this.http.put(this.url + solicitudId + '/rechazar', { comentarioRechazo });
  }
  
  
  editarRecursoNumSerie(numSerie: string, vrecurso: Recurso): Observable<any> {
    return this.http.put(`${this.url}numserie1/${numSerie}`, vrecurso);
  }

  editarPosesionRecurso(numSerie: string, posesion: string): Observable<any> {
    return this.http.put(`${this.url}numserie/${numSerie}`, { posesion });
}
}

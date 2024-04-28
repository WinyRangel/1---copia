import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitarRecursoService {

  private apiUrl = 'https://servidor-unity-1.onrender.com/api/solicitudes';

  constructor( private http: HttpClient) { }

  solicitarRecurso(datosSolicitud: any) {
    return this.http.post(this.apiUrl, datosSolicitud);
  }
}

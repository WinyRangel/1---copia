import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  url = 'http://localhost:4000/api/empresa';

  constructor(private http: HttpClient) { }

  verEmpresas(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarEmpresa(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  crearEmpresa(empresa : Empresa): Observable<any>{
    return this.http.post(this.url, empresa);
  }

  obtenerEmpresa(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  actualizarEmpresa(id: string, empresa: Empresa): Observable<any>{
    return this.http.put(this.url + id, empresa);
  }

  obtenerEmpresas(): Observable<{ nomEmpresa: string }[]> {
    return this.http.get<{ nomEmpresa: string }[]>(this.url);
  }
}

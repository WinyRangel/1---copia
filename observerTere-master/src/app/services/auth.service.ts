import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private username: string = '';
  private rol: string = '';
  private validado: boolean = false;

  loggedIn() {
    return this.isAuthenticated;
  }
  authService: any;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
    this.username = localStorage.getItem('username') || '';
    this.rol = localStorage.getItem('rol') || '';
   }

  urlRegistro = 'http://localhost:4000/api/users/registro/';
  url = 'http://localhost:4000/api/users/';
  urlInicioSesion = 'http://localhost:4000/api/users/inicio-sesion';
  urlRecuperarContrasena = 'http://localhost:4000/api/users/recuperar-contrasena'
  miurl = 'http://localhost:4000/api/users/userEmpresa'

  setAuthentication(status: boolean, username: string, rol: string): void {
    this.isAuthenticated = status;
    this.username = username;
    this.rol = rol;
  
    if (status) {
      localStorage.setItem('token', 'dummy_token');
      localStorage.setItem('username', username);
      localStorage.setItem('rol', rol.toString());
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('rol');
    }
  }

  getUserRole(): string {
    return this.rol;
  }
  getUsername(): string {
    return this.username;
  }
  registrarUsuario(datosUsuario: any): Observable<any> {
    return this.http.post<any>(this.urlRegistro, datosUsuario);
  }

  obtenerUsuario(username: string): Observable<any>{
    return this.http.get(this.urlInicioSesion + username);
  }


  inicioSesion(user: any): Observable<any> {
    return this.http.post<any>(this.urlInicioSesion, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(error => {
        if (error.status === 401 && error.error && error.error.message === 'El usuario no está validado') {
          // Usuario no validado, lanzar un error con un mensaje personalizado
          return throwError('El usuario no está validado');
        } else {
          // Otro tipo de error, reenviarlo
          return throwError(error);
        }
      })
    );
  }
  

  /*
  inicioSesion(user: any): Observable<any> {
    return this.http.post<any>(this.urlInicioSesion, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  */

  cerrarSesion(): void {
    this.setAuthentication(false, '', ''); // Llama al método setAuthentication para establecer el estado de autenticación como falso
  }
  logoutF(): void {
    this.setAuthentication(false, '', ''); // Llama al método setAuthentication para establecer el estado de autenticación como falso
  }

  getToken(): string | null {
    // Obtener el token del localStorage
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    // Verifica si hay un token en el localStorage
    return !!localStorage.getItem('token');
  }
  obtenerUsuarios(): Observable<any> {
    // Agrega el token JWT a las cabeceras de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    
    return this.http.get<any>('http://localhost:4000/api/users/registro', { headers });
  }

  recuperarContrasena(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/users//recuperar-contrasena', { email });
  }

  cambiarContrasena(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/users/cambiar-contrasena', { token, newPassword });
  }

   //Dos capas
   verificarTokenAutenticacion(token: string): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/users/verificar-token', { token });
  }

  verificarTokenCorreo(token: string): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/users/verificar-token-correo', { token });
  }


  parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return null;
    }
  }
  obtenerRol(): string | null {
    const token = this.getToken();
    console.log('Token:', token); // Verifica si el token está presente
    if (token) {
      const decodedToken = this.parseJwt(token);
      console.log('Decoded token:', decodedToken); // Verifica el token decodificado
      return decodedToken ? decodedToken.rol : null;
    }
    return null;
  }

  obtenerDatosUser(): { nombre: string, rol: string, usuarioId: string, nomEmpresa: string, username: string} | null {
    const token = this.getToken();
    console.log('Token:', token); // Verifica si el token está presente
    if (token) {
      const decodedToken = this.parseJwt(token);
      console.log('Decoded token datos:', decodedToken); // Verifica el token decodificado
      if (decodedToken) {
        return {
          usuarioId: decodedToken._id,
          nombre: decodedToken.nombre,
          rol: decodedToken.rol,
          nomEmpresa: decodedToken.nomEmpresa,
          username: decodedToken.username,
        };
      }
    }
    return null;
  }

 

  getUsuarioEmpresa(): Observable<any> {
    return this.http.get(this.miurl);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }


  crearUsuario(usuario : Usuario): Observable<any>{
    return this.http.post(this.urlRegistro, usuario);
  }

  getUsuario(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  actualizarUsuario(id: string, usuario: Usuario): Observable<any>{
    return this.http.put(this.url + id, usuario);
  }

  
}

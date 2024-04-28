import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarRecursoComponent } from './components/eliminar-recurso/eliminar-recurso.component';
import { EditRecursoComponent } from './components/edit-recurso/edit-recurso.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados/listar-empleados.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { MapaComponent } from './mapa/mapa/mapa.component';
import { Error404Component } from './components/error404/error404/error404.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { AuthGuard } from './auth.guard';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { VerificarTokenComponent } from './components/verificar-token/verificar-token.component';
import { UnityComponent } from './components/unity/unity.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { AgregarRecursoComponent } from './components/agregar-recurso/agregar-recurso.component';
import { EmpresaComponent } from './components/empresa/empresa.component';


const routes: Routes = [
  { path: '', component: UnityComponent,  data: { breadcrumb: 'Inicio'}},
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Inicio', expectedRoles: ['administrador']}},
  { path: 'agregar-recurso', component: AgregarRecursoComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Inicio', expectedRoles: ['administrador']}},
  { path: 'unity', component: UnityComponent, data: { breadcrumb: 'Inicio'}},
  { path: 'inicio-usuario', component: InicioUsuarioComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Proveedores', expectedRoles: ['usuario']}},
  { path: 'conocenos', component: ConocenosComponent, data: { breadcrumb: 'Inicio'}},
  { path: 'pedido', component: PedidoComponent, canActivate: [AuthGuard]}, // , data: { breadcrumb: 'Pedido'}
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Proveedores', expectedRoles: ['administrador']}},
  { path: 'mapa', component: MapaComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Mapa del Sitio'}},
  {path: 'listar-empleados', component: ListarEmpleadosComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados', expectedRoles: ['administrador']}},
  {path: 'registro', component: RegistroComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Registrar Empleado', expectedRoles: ['administrador']}},
  {path: 'editar-empleado/:id', component: RegistroComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Empleados > Editar Empleado', expectedRoles: ['administrador']}},
  { path: 'listar-recurso', component: ListarRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos', expectedRoles: ['administrador'] }},
  { path: 'crear-recurso', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Crear Recursos', expectedRoles: ['administrador']}},
  { path: 'editar-recurso/:id', component: CrearRecursoComponent, canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Editar Recursos', expectedRoles: ['administrador']}},
  { path: 'eliminar-recurso/:id', component: EliminarRecursoComponent,  canActivate: [AuthGuard],  data: { breadcrumb: 'Recursos > Eliminar Recurso', expectedRoles: ['administrador']}},
  { path: 'edit-recurso/:id', component: EditRecursoComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Recursos > Editar Recursos', expectedRoles: ['administrador']}},
  { path: 'productos', component: ProductosComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Productos'}},
  { path: 'solicitudes', component: SolicitudesComponent,  canActivate: [AuthGuard], data: { breadcrumb: 'Solicitudes'}},
  { path: 'aceptar-solicitud/:id', component: SolicitudesComponent,  canActivate: [AuthGuard], data: { expectedRoles: ['administrador']}}, //breadcrumb: 'Solicitudes', 
  {path: 'contacto', component: ContactoComponent, data: { breadcrumb: 'Contacto'}},
  {path: 'registrar-proveedor', component: RegistrarProveedorComponent,  canActivate: [AuthGuard], data: { expectedRoles: ['administrador']}}, //breadcrumb: 'Registrar Proveedor', 
  {path: 'error404', component: Error404Component, data: { breadcrumb: 'Error 404'}},
  {path: 'signin', component: SigninComponent, data: { breadcrumb: 'Acceso'}},
  {path: 'signup', component: SignupComponent, data: { breadcrumb: 'Registro'}},
  {path: 'recuperar-contraseña', component: RecuperarContrasenaComponent, data: { breadcrumb: 'Recuperar Contraseña'}},
  { path: 'nosotros', component: NosotrosComponent, canActivate: [AuthGuard]}, // , data: { breadcrumb: 'Mapa del Sitio'}
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent, data: { breadcrumb: 'Preguntas Frecuentes'}},
  {path: 'registrar-empresa', component: EmpresaComponent, data: { breadcrumb: 'Preguntas Frecuentes'}},
  {path: 'verificar-token', component: VerificarTokenComponent, data: { breadcrumb: 'Verificar Token'}},
  {path: 'listar-usuarios', component: ListarUsuariosComponent, data: { breadcrumb: 'Verificar Token'}},
  { path: '**', redirectTo: 'error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

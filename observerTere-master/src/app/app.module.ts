import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RecaptchaModule } from 'ng-recaptcha';

//Importaciones de Angular Material

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { ListarRecursoComponent } from './components/listar-recurso/listar-recurso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { EliminarRecursoComponent } from './components/eliminar-recurso/eliminar-recurso.component';
import { EditRecursoComponent } from './components/edit-recurso/edit-recurso.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados/listar-empleados.component';
import { EmpleadofilterPipe } from './pipes/empleadofilter.pipe';
import { RegistroComponent } from './registro/registro/registro.component';
import { MapaComponent } from './mapa/mapa/mapa.component';
import { Error404Component } from './components/error404/error404/error404.component';
import { SigninComponent } from './components/signin/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

import {BreadcrumbModule} from 'angular-crumbs';
import { HeaderComponent } from './components/header/header/header.component';
import { SearchComponent } from './components/header/search/search.component';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorfilterPipe } from './pipes/proveedorfilter.pipe';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FiltroPorPalabraClavePipePipe } from './components/header/search/filtro-por-palabra-clave-pipe.pipe';
import { ProductosComponent } from './components/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

import { SearchService2 } from 'src/app/services/search.service';
import { PedidoComponent } from './components/pedido/pedido.component';
import { AprobarSolicitudComponent } from './components/aprobar-solicitud/aprobar-solicitud.component';
import { RegistrarProveedorComponent } from './components/registrar-proveedor/registrar-proveedor.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { VerificarTokenComponent } from './components/verificar-token/verificar-token.component';
import { UnityComponent } from './components/unity/unity.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { AgregarRecursoComponent } from './components/agregar-recurso/agregar-recurso.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
@NgModule({
  declarations: [
    AppComponent,
    CrearRecursoComponent,
    ListarRecursoComponent,
    FilterPipe,
    EliminarRecursoComponent,
    EditRecursoComponent,
    InicioComponent,
    ListarEmpleadosComponent,
    EmpleadofilterPipe,
    RegistroComponent,
    MapaComponent,
    Error404Component,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    SearchComponent,
    SidebarComponent,
    ContactoComponent,
    FooterComponent,
    ProveedoresComponent,
    ProveedorfilterPipe,
    RecuperarContrasenaComponent,
    ResetPasswordComponent,
    FiltroPorPalabraClavePipePipe,
    ProductosComponent,
    PedidoComponent,
    AprobarSolicitudComponent,
    RegistrarProveedorComponent,
    NosotrosComponent,
    PreguntasFrecuentesComponent,
    VerificarTokenComponent,
    UnityComponent,
    ConocenosComponent,
    SolicitudesComponent,
    InicioUsuarioComponent,
    AgregarRecursoComponent,
    EmpresaComponent,
    ListarUsuariosComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    BreadcrumbModule,
    RecaptchaModule
     ],
  providers: [SearchService2
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

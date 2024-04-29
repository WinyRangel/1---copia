
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Registrar empleado'
  id: string | null;
  departamentos: { nombre: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  gerents: { gerente: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private _empleadoService: EmpleadoService,
    private aRouter: ActivatedRoute, private toastr: ToastrService, private sessionService: SessionService, private authService: AuthService, ){
    
      this.usuarioForm = this.fb.group({
        nombre: [''],
        apellido: [''],
        telefono: [''],
        email: [''],
        nomEmpresa: [''],
        rfc: [''],
        username: [''],
        password: [''],
        validado: [false]
      });
    this.id = this.aRouter.snapshot.paramMap.get('id')
}



  ngOnInit(): void {
    this.esEditar();
    this.loadDepartments();
    this.loadGerents();
    this.sessionService.startSessionTimer();

  }


  loadDepartments() {
    this._empleadoService.obtenerDepartamento().subscribe(
      (departamentos: { nombre: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.departamentos = departamentos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadGerents() {
    this._empleadoService.obtenerGerente().subscribe(
      (gerents: { gerente: string }[]) => {
        // Actualiza las opciones de departamento en el formulario
        this.gerents = gerents;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  crearUsuario(){
    const valorPorDefectoValidado = true;
    const USUARIO: Usuario = {
      nombre: this.usuarioForm.get('nombre')?.value,
      apellido: this.usuarioForm.get('apellido')?.value,
      telefono: this.usuarioForm.get('telefono')?.value,
      email: this.usuarioForm.get('email')?.value,
      nomEmpresa: this.usuarioForm.get('nomEmpresa')?.value,
      rfc: this.usuarioForm.get('rfc')?.value,
      username: this.usuarioForm.get('username')?.value,
      password: this.usuarioForm.get('password')?.value,
      validado: valorPorDefectoValidado,
    }
    console.log(USUARIO);
    if('Editar Empleado' === this.titulo) {
      if(this.id != null) {
        this.authService.actualizarUsuario(this.id, USUARIO).subscribe(data =>{
          this.toastr.success('Empleado actualizado con exito!');
          this.router.navigate(['/listar-empleado'])
          this.usuarioForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this.authService.crearUsuario(USUARIO).subscribe(data =>{
        this.toastr.success('Empleado agregado con exito');
        this.router.navigate(['/listar-empleados'])
      }, error => {
        this.usuarioForm.reset();
        alert(error);
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Empleado';
      this.authService.getUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          nomEmpresa: data.nomEmpresa,
          rfc: data.rfc,
          username: data.username,
          password: data.password,
          validado: data.validado
        })
      })
    }
  }
}
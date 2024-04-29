import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit{
  listUsuarios: Usuario [] = [];
  filterUsuario = '';
  usuarioForm: FormGroup;
  formularioEnviado: boolean = false; // Variable para controlar si el formulario ha sido enviado
  id: string | null = null;
  titulo = 'Registrar empleado'

  constructor(private authService: AuthService, private toastr: ToastrService, private sessionService: SessionService, private fb: FormBuilder,) {
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
   }

  ngOnInit(): void {
    this.obtenerUsuarios1();
    this.sessionService.startSessionTimer();
    //this.esEditar();
  }


  obtenerUsuarios1() { 
    this.authService.getUsuarios().subscribe(
      data => {
        console.log(data);
        // Verifica que data.usuarios sea una matriz antes de asignarlo a listUsuarios
        if (Array.isArray(data.usuarios)) {
          this.listUsuarios = data.usuarios;
        } else {
          console.error('La propiedad "usuarios" en los datos recibidos no es una matriz.');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*

  crearEditarUsuario() {
    const usuario: Usuario = this.usuarioForm.value;
    if (this.titulo === 'Editar Usuario') {
      if (this.id) {
        this.authService.actualizarUsuario(this.id, usuario).subscribe(data => {
          console.log('Usuario actualizado con éxito:', data);
          // Aquí puedes redirigir o hacer otras acciones después de la actualización
        }, error => {
          console.error('Error al actualizar usuario:', error);
        });
      }
    } else {
      this.authService.crearUsuario(usuario).subscribe(data => {
        console.log('Usuario creado con éxito:', data);
        // Aquí puedes redirigir o hacer otras acciones después de la creación
      }, error => {
        console.error('Error al crear usuario:', error);
      });
    }
  }

  esEditar() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.titulo = 'Editar Usuario';
      this.authService.obtenerUsuario(this.id).subscribe(data => {
        this.usuarioForm.patchValue(data);
      }, error => {
        console.error('Error al obtener usuario:', error);
      });
    }
  }
  */

  eliminarUsuario(id: any) {  
      this.authService.eliminarUsuario(id).subscribe(
        data => {
          Swal.fire({
            title: "¿Estás seguro de querer eliminar a este empleado?",
            text: "Esta acción no puede ser revertidad",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro."
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado",
                text: "Este empleado ha sido eliminado.",
                icon: "success"
              });
            }
          });
          this.obtenerUsuarios1();
        },
        error => {
          console.log(error);
        }
      );
    }
  }


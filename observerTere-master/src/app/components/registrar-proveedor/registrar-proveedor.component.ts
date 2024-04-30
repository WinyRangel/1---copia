import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-proveedor',
  templateUrl: './registrar-proveedor.component.html',
  styleUrls: ['./registrar-proveedor.component.css']
})
export class RegistrarProveedorComponent implements OnInit{
  @ViewChild('productosContainer') productosContainer!: ElementRef;

  proveedorForm: FormGroup;
  titulo = 'Registrar empleado'
  id: string | null;
  departamentos: { nombre: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  gerents: { gerente: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private _proveedorService: ProveedorService,
    private aRouter: ActivatedRoute, private toastr: ToastrService, private sessionService: SessionService, private authService: AuthService,){
    
      this.proveedorForm = this.fb.group ({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      categoria: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      email: ['', Validators.required],
      productos: ['', Validators.required],
      nomEmpresa: ['',],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
}

empresaNombre: string = ''; 

  ngOnInit(): void {
    this.esEditar();
    this.sessionService.startSessionTimer();

    
     // Obtener datos del usuario y asignar el nombre
     const userData = this.authService.obtenerDatosUser();
     if (userData) {
       this.empresaNombre = userData.nomEmpresa;
     }

  }



  registrarProveedor(){
    const PROVEEDOR: Proveedor = {
      nombre: this.proveedorForm.get('nombre')?.value,
      direccion: this.proveedorForm.get('direccion')?.value,
      categoria: this.proveedorForm.get('categoria')?.value,
      telefono: this.proveedorForm.get('telefono')?.value,
      email: this.proveedorForm.get('email')?.value,
      productos: this.proveedorForm.get('productos')?.value,
      nomEmpresa: this.empresaNombre,
    }
    console.log(PROVEEDOR);
    if('Editar proveedor' === this.titulo) {
      if(this.id != null) {
        this._proveedorService.actualizarProveedor(this.id, PROVEEDOR).subscribe(data =>{
          this.toastr.success('Proveedor actualizado con exito!');
          this.router.navigate(['/proveedores'])
          this.proveedorForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._proveedorService.crearProveedor(PROVEEDOR).subscribe(data =>{
        this.toastr.success('Proveedor agregado con exito');
        this.router.navigate(['/proveedores'])
      }, error => {
        this.proveedorForm.reset();
        alert(error);
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Empleado';
      this._proveedorService.obtenerProveedor(this.id).subscribe(data => {
        this.proveedorForm.setValue({
          nombre: data.nombre,
          telefono: data.telefono,
          email: data.email
        })
      })
    }
  }
  
  agregarProducto() {
    if (this.productosContainer) {
      const input = document.createElement('input');
      input.type = 'text';
      input.classList.add('form-control');
      input.placeholder = 'Producto';
      this.productosContainer.nativeElement.appendChild(input);
    }
  }
  
}

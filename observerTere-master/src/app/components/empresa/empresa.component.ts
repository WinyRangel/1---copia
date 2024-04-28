import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  empresaForm: FormGroup;
  id: string | null;
  titulo = 'Registrar empresa'
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private _empresaService: EmpresaService,
    private aRouter: ActivatedRoute, private toastr: ToastrService, private sessionService: SessionService){
    
      this.empresaForm = this.fb.group ({
      nomEmpresa: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10,12}')]],
      email: ['', Validators.required],
      direccion: ['', Validators.required], 
    });
    this.id = this.aRouter.snapshot.paramMap.get('id')
}

  ngOnInit(): void {
    this.esEditar();
    this.sessionService.startSessionTimer();

  }



  crearEmpresa(){
    const EMPRESA: Empresa = {
      nomEmpresa: this.empresaForm.get('nomEmpresa')?.value,
      telefono: this.empresaForm.get('telefono')?.value,
      email: this.empresaForm.get('email')?.value,
      direccion: this.empresaForm.get('direccion')?.value,
    }
    console.log(EMPRESA);
    if('Editar Empresa' === this.titulo) {
      if(this.id != null) {
        this._empresaService.actualizarEmpresa(this.id, EMPRESA).subscribe(data =>{
          this.toastr.success('Empresa actualizado con exito!');
          this.router.navigate(['/signup'])
          this.empresaForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._empresaService.crearEmpresa(EMPRESA).subscribe(data =>{
        this.toastr.success('Empresa agregado con exito');
        this.router.navigate(['/signup'])
      }, error => {
        this.empresaForm.reset();
        alert(error);
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Empleado';
      this._empresaService.obtenerEmpresa(this.id).subscribe(data => {
        this.empresaForm.setValue({
          nomEmpresa: data.nomEmpresa,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
        })
      })
    }
  }
}

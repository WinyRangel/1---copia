import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { passwordValidator } from './validators'; // Importa la función de validación desde el archivo validators.ts
import Swal from 'sweetalert2';
import { error } from 'jquery';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuarioForm: FormGroup;
  formularioEnviado: boolean = false; // Variable para controlar si el formulario ha sido enviado
  passwordVisible: boolean = false;
  passwordVisible1: boolean = false;
  empresas: { nomEmpresa: string}[] = []; // Ajusta el tipo según la estructura real de tus objetos de departamento


  constructor(private fb: FormBuilder, private authService: AuthService, private _empresaService: EmpresaService, private router: Router) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(6)]],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(6)]],
      nomEmpresa: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator()]],
      confirmPassword: ['', Validators.required],
      recaptchaToken: ['', Validators.required]

    }, {
      validators: this.passwordMatchValidator
    });
  }
  onCaptchaResolved(token: string): void {
    this.usuarioForm.get('recaptchaToken')?.setValue(token);
  }
  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(){
    this._empresaService.verEmpresas().subscribe(
      (empresas: {nomEmpresa: string}[])=>{
        this.empresas = empresas;
      },
      (error) => {
        console.error(error)
      }
    )
  }

  registrarUsuario() {
    this.formularioEnviado = true; // Marcar el formulario como enviado
    if (this.usuarioForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa correctamente todos los campos del formulario."
      });
      return;
    }
    this.authService.registrarUsuario(this.usuarioForm.value).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500
        });
        this.usuarioForm.reset();
        this.formularioEnviado = false; // Reiniciar el estado del formulario enviado
        this.router.navigate(['/signin']);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al registrarse",
          footer: 'El nombre de usuario o la contraseña ya existen.'
        });
        console.error(error);
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
  
    if (password?.value !== confirmPassword?.value) { 
      confirmPassword?.setErrors({ passwordsNotMatching: true });
      return { passwordsNotMatching: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordVisibility1(): void {
    this.passwordVisible1 = !this.passwordVisible1;
  }
}

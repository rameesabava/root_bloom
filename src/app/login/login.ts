import { Component, inject } from '@angular/core';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";
import { ApiService } from '../services/api-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [AdminModuleRoutingModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  api = inject(ApiService)
  auth = inject(AuthService)

  loginForm: FormGroup
  formBuilder = inject(FormBuilder)

  router = inject(Router)

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.api.loginAPI({ email, password }).subscribe({
        next: (res: any) => {
          sessionStorage.setItem("token", res.token)
          sessionStorage.setItem("user", JSON.stringify(res.user))
          this.auth.loadUser()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login Successful!'
          })
          this.loginForm.reset()
          if (res.user.role == "user") {
            this.router.navigateByUrl('/plants')
          } else {
            this.router.navigateByUrl('/admin')
          }
        },
        error: (reason: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: reason.error
          })
          this.loginForm.reset()
        }
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please Fill the Form Completely!'
      })
    }
  }

}
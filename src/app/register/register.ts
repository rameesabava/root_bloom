import { Component, inject } from '@angular/core';
import { AdminModuleRoutingModule } from "../admin-module/admin-module-routing-module";
import { ApiService } from '../services/api-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [AdminModuleRoutingModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  api = inject(ApiService)

  registerForm: FormGroup
  formBuilder = inject(FormBuilder)

  router = inject(Router)

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z]+( [A-Za-z]+)*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ,.-]+$')]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const phone = this.registerForm.value.phone
      const address = this.registerForm.value.address
      this.api.registerAPI({ username, email, password, phone, address }).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration Completed Successfully!'
          })
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
        },
        error: (reason: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: reason.error
          })
          this.registerForm.reset()
                    this.router.navigateByUrl('/login')

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

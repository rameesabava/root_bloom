import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  auth = inject(AuthService)
  router = inject(Router)

  ngOnInit(){
    this.auth.loadUser()
  }

 logout(){
  sessionStorage.clear()
  this.auth.loadUser()
  Swal.fire({
              icon: 'success',
              title: 'Success',
              text: "Logout successful!!"
            })
  this.router.navigateByUrl('/login')
 }
}

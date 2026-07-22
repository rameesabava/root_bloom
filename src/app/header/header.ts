import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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
              title: 'success',
              text: "Logout successful!!"
            })
  this.router.navigateByUrl('/')
 }

    
}

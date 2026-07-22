import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  imports: [AsyncPipe],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  plantId = this.route.snapshot.params['id']

  plantDetails = signal<any>({})

  ngOnInit() {
    this.getPlantDetails(this.plantId)
  }

  getPlantDetails(plantId: string) {
    this.api.viewPlantAPI(plantId).subscribe((res: any) => {
      this.plantDetails.set(res)
    })
  }

  addToCart(plantId: string) {
    this.api.addToCartAPI(plantId).subscribe({
      next: (res: any) => {
        if (res.status == 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Plant Added to Cart Successfully!'
          })
        }else if(res.status==200){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Plant already exists in your cart. Quantity updated successfully!'
          })
        }

        this.router.navigateByUrl('/cart')

      },
      error: (reason: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: reason.error
        })
      }
    })
  }
}

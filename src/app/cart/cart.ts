import { Component, inject, signal, computed } from '@angular/core';
import { ApiService } from '../services/api-service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  api = inject(ApiService)
  allCartPlants: any = signal([])

  subTotal = computed(() => this.allCartPlants().reduce((acc: Number, curr: any) => acc + curr.totalPrice, 0))
  deliveryCharge = computed(() => this.subTotal() >= 999 ? 0 : 50)
  grandTotal = computed(() => this.subTotal() + this.deliveryCharge())

  ngOnInit() {
    this.getCartPlants()

  }

  getCartPlants() {
    this.api.getCartPlantsAPI().subscribe((res) => {
      console.log(res);
      this.allCartPlants.set(res)
      console.log(this.allCartPlants());
    })
  }

  incrementQuantity(cartId: string) {
    this.api.incrementQuantityAPI(cartId).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Quantity incremented"
        })
        this.getCartPlants()
      }
    })
  }

  decrementQuantity(cartId: string) {
    this.api.decrementQuantityAPI(cartId).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message
        })
        this.getCartPlants()
      }
    })  
  }

  deleteCartItem(cartId:string){
    this.api.removeCartItemAPI(cartId).subscribe({
      next:(res:any)=>{
         Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Plant removed successfully"
        })
        this.getCartPlants()
      }
    })
  }

}

import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  api = inject(ApiService)
  router = inject(Router)
  allCartPlants: any = signal([])
  username: string = ""
  phone: number | null = null
  address: string = ""
  paymentMethod: string = "Cash on Delivery"


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

  addOrder() {
    if (this.username && this.phone && this.address) {
      const data = { username: this.username, phone: this.phone, address: this.address, totalAmount: this.grandTotal(), paymentMethod: this.paymentMethod, items: this.allCartPlants().map((item: any) => ({ plantId: item.plantId, plantName: item.plantName, plantImage: item.plantImage, quantity: item.quantity, price: item.price })) }
      this.api.addOrderAPI(data).subscribe({
        next: (res: any) => {
          this.api.removeAllCartItemsAPI().subscribe()
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Order Placed Successfully!!"
          })
          this.allCartPlants.set([])
          this.router.navigateByUrl('/cart')

        }
      })
    }else{
      Swal.fire({
            icon: 'warning',
            title: 'Incomplete Form',
            text: "Please fill the form completely!!"
          })
    }
  }

}

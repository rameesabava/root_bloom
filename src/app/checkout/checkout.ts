import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

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

}

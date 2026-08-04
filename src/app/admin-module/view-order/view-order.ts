import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  standalone: false,
  templateUrl: './view-order.html',
  styleUrl: './view-order.css',
})
export class ViewOrder {
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  router = inject(Router)

  orderId = this.route.snapshot.params['id']

  orderDetails = signal<any>({})

  ngOnInit() {
    this.getOrderDetails(this.orderId)
  }

  getOrderDetails(orderId: string) {
    this.api.viewOrderAPI(orderId).subscribe((res: any) => {
      this.orderDetails.set(res)
    })
  }

}

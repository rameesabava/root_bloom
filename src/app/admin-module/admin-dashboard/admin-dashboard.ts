import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  api = inject(ApiService)
  plantCount = signal(0)
  userCount = signal(0)
  allOrders = signal<any[]>([])

  ngOnInit() {
    this.getPlantCount()
    this.getUsersCount()
    this.getOrders()
  }

  getPlantCount() {
    this.api.getPlantsAPI().subscribe({
      next: (res: any) => {
        this.plantCount.set(res.length)
        console.log(this.plantCount());

      }
    })
  }

  getUsersCount() {
    this.api.getUsersAPI().subscribe({
      next: (res: any) => {
        this.userCount.set(res.length)
        // console.log(this.plantCount());
        // console.log(this.userCount());

      }
    })
  }

  getOrders(){
    this.api.getPlacedOrdersAPI().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allOrders.set(res)
        
      }
    })
  }

}

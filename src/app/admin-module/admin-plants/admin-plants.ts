import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-admin-plants',
  standalone: false,
  templateUrl: './admin-plants.html',
  styleUrl: './admin-plants.css',
})
export class AdminPlants {
  api = inject(ApiService)
  serverUrl = this.api.server_url

  allPlants: any = signal([])
  categoryArray:any = signal([])
  dummyPlants:any = []

  p:number = 1
  searchKey: string = ""

  router = inject(Router)

  ngOnInit() {
    this.getAllPlants()
  }

  getAllPlants() {
    this.api.getPlantsAPI().subscribe((res) => {
      console.log(res);
      this.allPlants.set(res)
      this.dummyPlants = res
      const dummyCategoryArray = this.allPlants().map((item:any)=>item.category)
      // console.log(dummyCategoryArray);
      dummyCategoryArray.forEach((category:any)=>{
        !this.categoryArray().includes(category) && this.categoryArray().push(category)
      })
      console.log(this.categoryArray());
      
      

    })
  }

  filterPlants(category:string){
    this.allPlants.set(this.dummyPlants.filter((item:any)=>item.category==category))

  }
  
}

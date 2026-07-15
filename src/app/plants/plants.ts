import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';

@Component({
  selector: 'app-plants',
  imports: [RouterLink, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './plants.html',
  styleUrl: './plants.css',
})
export class Plants {
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

  viewPlant(plantId: string) {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl(`/plant/${plantId}`)
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please Login!'
      })
      this.router.navigateByUrl('/login')
    }
  }

  filterPlants(category:string){
    this.allPlants.set(this.dummyPlants.filter((item:any)=>item.category==category))

  }
}

import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view',
  imports: [AsyncPipe],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  api = inject(ApiService)
    route = inject(ActivatedRoute)

    plantId = this.route.snapshot.params['id']


  plantDetails = signal<any>({})

  ngOnInit(){
    this.getPlantDetails(this.plantId)
}

getPlantDetails(plantId:string){
  this.api.viewPlantAPI(plantId).subscribe((res:any)=>{
    this.plantDetails.set(res)
  })
}

}

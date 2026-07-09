import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-plants',
  imports: [RouterLink],
  templateUrl: './plants.html',
  styleUrl: './plants.css',
})
export class Plants {
  api = inject(ApiService)
  serverUrl = this.api.server_url

  allPlants: any = signal([])
  router = inject(Router)
  ngOnInit() {
    this.getAllPlants()
  }

  getAllPlants() {
    this.api.getPlantsAPI().subscribe((res) => {
      console.log(res);
      this.allPlants.set(res)

    })
  }

}

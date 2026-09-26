import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-plants',
  standalone: false,
  templateUrl: './update-plants.html',
  styleUrl: './update-plants.css'
})
export class UpdatePlants {

  api = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  plantId: string = '';

  selectedImage: File | null = null;

  imageUrl: string = '';

  plant: any = null;


  ngOnInit() {

    this.plantId = this.route.snapshot.paramMap.get('id') || '';

    console.log("Plant ID:", this.plantId);

    if (this.plantId) {
      this.getPlantDetails();
    }

  }


  getPlantDetails() {

    this.api.viewPlantAPI(this.plantId).subscribe({

      next: (response: any) => {

        console.log("Plant Details:", response);

        this.plant = response;

        this.imageUrl =
          `${this.api.server_url}/uploads/${this.plant.image}`;

      },

      error: (error: any) => {

        console.log("Error:", error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load plant details'
        });

      }

    });

  }


  selectImage(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.selectedImage = file;

      this.imageUrl = URL.createObjectURL(file);

    }

  }


  updatePlant() {

    const formData = new FormData();

    formData.append('name', this.plant.name);
    formData.append('category', this.plant.category);
    formData.append('price', this.plant.price);
    formData.append('stock', this.plant.stock);
    formData.append('description', this.plant.description);

    formData.append('size', this.plant.size);
    formData.append('height', this.plant.height);
    formData.append('potSize', this.plant.potSize);
    formData.append('sunlight', this.plant.sunlight);
    formData.append('watering', this.plant.watering);
    formData.append('humidity', this.plant.humidity);
    formData.append('temperature', this.plant.temperature);
    formData.append('fertilizer', this.plant.fertilizer);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.api.updatePlantAPI(this.plantId, formData).subscribe({

      next: (response: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Plant Updated',
          text: 'Plant updated successfully',
          confirmButtonColor: '#198754'
        }).then(() => {

          this.router.navigate(['/admin/plants']);

        });

      },

      error: (error: any) => {

        console.log(error);

        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Unable to update plant'
        });

      }

    });

  }

}
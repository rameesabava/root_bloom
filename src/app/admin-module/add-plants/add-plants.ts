import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-plants',
  standalone: false,
  templateUrl: './add-plants.html',
  styleUrl: './add-plants.css'
})
export class AddPlants {

  api = inject(ApiService)
  router = inject(Router)

  selectedImage: File | null = null

  plant = {
    name: '',
    category: '',
    price: '',
    stock: 1,
    description: '',
    size: '',
    height: '',
    potSize: '',
    sunlight: '',
    watering: '',
    humidity: '',
    temperature: '',
    fertilizer: ''
  }


  selectImage(event: any) {

    const file = event.target.files[0]

    if (file) {
      this.selectedImage = file
    }

  }


  addPlant() {

    if (!this.selectedImage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please select a plant image'
      })

      return
    }


    const formData = new FormData()

    formData.append('name', this.plant.name)
    formData.append('category', this.plant.category)
    formData.append('price', this.plant.price.toString())
    formData.append('stock', this.plant.stock.toString())
    formData.append('description', this.plant.description)

    formData.append('size', this.plant.size)
    formData.append('height', this.plant.height)
    formData.append('potSize', this.plant.potSize)
    formData.append('sunlight', this.plant.sunlight)
    formData.append('watering', this.plant.watering)
    formData.append('humidity', this.plant.humidity)
    formData.append('temperature', this.plant.temperature)
    formData.append('fertilizer', this.plant.fertilizer)

    formData.append('image', this.selectedImage)


    this.api.addPlantAPI(formData).subscribe({

      next: (res: any) => {

        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Plant added successfully!'
        })


        this.router.navigate(['/admin/plants'])

      },

      error: (err) => {

        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add plant'
        })


      }

    })

  }

}
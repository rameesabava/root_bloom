import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { AddPlants } from './add-plants/add-plants';
import { UpdatePlants } from './update-plants/update-plants';

const routes: Routes = [
  {
    path:"",component:Dashboard,title:"Dashboard"
  },
  {
    path:"addPlants",component:AddPlants,title:"Add Plants"
  },
  {
    path:"update/:id",component:UpdatePlants,title:"Update Plants"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}

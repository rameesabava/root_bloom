import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlants } from './add-plants/add-plants';
import { UpdatePlants } from './update-plants/update-plants';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

const routes: Routes = [
  {
    path:"",component:AdminDashboard,title:"Dashboard"
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

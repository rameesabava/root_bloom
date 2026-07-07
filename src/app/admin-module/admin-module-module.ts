import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing-module';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AddPlants } from './add-plants/add-plants';
import { UpdatePlants } from './update-plants/update-plants';

@NgModule({
  declarations: [AdminDashboard, AddPlants, UpdatePlants],
  imports: [CommonModule, AdminModuleRoutingModule],
})
export class AdminModuleModule {}

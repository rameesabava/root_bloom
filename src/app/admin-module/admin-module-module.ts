import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing-module';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AddPlants } from './add-plants/add-plants';
import { UpdatePlants } from './update-plants/update-plants';
import { ViewOrder } from './view-order/view-order';
import { AdminHeader } from './admin-header/admin-header';
import { AdminLayout } from './admin-layout/admin-layout';
import { AdminPlants } from './admin-plants/admin-plants';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminDashboard,
    AddPlants,
    UpdatePlants,
    ViewOrder,
    AdminHeader,
    AdminLayout,
    AdminPlants,
  ],
  imports: [CommonModule, AdminModuleRoutingModule, FormsModule, SearchPipe, NgxPaginationModule],
})
export class AdminModuleModule {}

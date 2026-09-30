import { Component } from '@angular/core';
import { AdminModuleRoutingModule } from '../admin-module/admin-module-routing-module';

@Component({
  selector: 'app-about',
  imports: [AdminModuleRoutingModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}

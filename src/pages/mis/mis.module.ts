import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MISRoutes, MISRoutingModule } from './mis.routing';

import { ComponentsModule } from '../components/components.module';
import { MISComponent } from './mis.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagerService } from '../../providers/pagination/pager.service';
import { AdminModule } from './admin/admin.module';
@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(MISRoutes),
    MISRoutingModule,
    FormsModule,
    ComponentsModule,
    AdminModule
  ],
  declarations: [MISComponent, DashboardComponent],
  providers: [PagerService],
})
export class MISModule {}

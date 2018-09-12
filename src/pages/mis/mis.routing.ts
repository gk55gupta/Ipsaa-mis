import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MISComponent } from './mis.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const MISRoutes: Routes = [
  {
    path: '',
    component: MISComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'admin',
        loadChildren: 'pages/mis/admin/admin.module#AdminModule'
      },
      {
        path: 'payroll',
        loadChildren: 'pages/mis/payroll/payroll.module#PayrollModule'
      },
      {
        path: 'attendance',
        loadChildren: 'pages/mis/attendance/attendance.module#AttendanceModule'
      },
      {
        path: 'fee',
        loadChildren: 'pages/mis/fee/fee.module#FeeModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MISRoutes)],
  exports: [RouterModule]
})
export class MISRoutingModule {
  constructor() {}
}

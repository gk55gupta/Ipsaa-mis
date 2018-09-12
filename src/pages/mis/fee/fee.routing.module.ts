import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFeeComponent } from './student-fee/student-fee.component';
const feeRoutes: Routes = [
  {
    path: 'studentfeemanagement',
    component: StudentFeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(feeRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class FeeRoutingModule {}

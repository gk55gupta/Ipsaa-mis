import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFeeComponent} from './student-fee/student-fee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeeRoutingModule } from './fee.routing.module';
import { StudenFeeInfoComponent } from './student-fee-info/student-fee-info.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeeRoutingModule
  ],
  declarations: [StudentFeeComponent, StudenFeeInfoComponent]
})
export class FeeModule {}

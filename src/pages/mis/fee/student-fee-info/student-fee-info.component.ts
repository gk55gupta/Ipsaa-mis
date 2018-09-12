
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { FeeService } from '../../../../providers/fee/fee.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import * as _ from 'underscore';
import { AlertService } from '../../../../providers/alert/alert.service';
import { DatePipe } from '@angular/common';
declare let $: any;

@Component({
  selector: 'app-student-fee-info',
  templateUrl: './student-fee-info.component.html'
})
export class StudenFeeInfoComponent implements OnInit, OnChanges {
  editable = false;
  mode = '';
  studentFee: any;
  studentFeeForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private alerService: AlertService,
    private datePipe: DatePipe,
    private feeService: FeeService
  ) { }

  @Input()
  set id(id: number) {
    if (id) {
      this.feeService.getStudentFeeById(id).subscribe((fee: any) => {
        fee.finalBaseFee = Number((fee.finalBaseFee / 3).toFixed(2));
        this.studentFee = fee;
        // to initialize base and final fields if not set
        this.feeService.initStudentFee(this.studentFee);
        this.studentFee.programName = this.studentFee.program.name;
        this.feeService.calculateGst(this.studentFee);
        this.feeService.calculateFinalFee(this.studentFee);
        this.studentFeeForm.patchValue(this.studentFee);
        this.updateDisabledFields(this.studentFeeForm.controls);  // to update fields as disabled
      });
    }
  }

  @Input()
  set update(update: boolean) {
    this.editable = update;
    this.mode = update ? 'Edit' : 'Show';
  }

  ngOnInit() {
    this.studentFeeForm = this.initStudentFeeFields();
  }

  ngOnChanges() {
    if (this.studentFeeForm) {
      this.updateDisabledFields(this.studentFeeForm.controls);
    }
  }

  hideViewPanel() {
    this.adminService.viewPanel.next(false);
  }

  initStudentFeeFields() {
    return this.fb.group({
      id: [{ value: '', disabled: true }],
      fullName: [{ value: '', disabled: true }],
      programName: [{ value: '', disabled: true }],
      annualFee: [{ value: '', disabled: true }],
      discountAnnualCharges: [{ value: '', disabled: true }],
      finalAnnualFee: [{ value: '', disabled: true }],
      admissionCharges: [{ value: '', disabled: true }],
      discountAdmissionCharges: [{ value: '', disabled: true }],
      finalAdmissionCharges: [{ value: '', disabled: true }],
      baseFee: [{ value: '', disabled: true }],
      discountBaseFee: [{ value: '', disabled: true }],
      finalBaseFee: [{ value: '', disabled: true }],
      securityDeposit: [{ value: '', disabled: true }],
      discountSecurityDeposit: [{ value: '', disabled: true }],
      finalSecurityDeposit: [{ value: '', disabled: true }],
      transportFee: [{ value: '', disabled: true }],
      uniformCharges: [{ value: '', disabled: true }],
      stationary: [{ value: '', disabled: true }],
      comment: [{ value: '', disabled: true }],
      gstFee: [{ value: '', disabled: true }],
      baseFeeGst: [{ value: '', disabled: true }],
      finalFee: [{ value: '', disabled: true }]
    });

  }

  calaculateDiscount(base, final, targetDiscount) {
    this.feeService.calculateDiscount(base, final, targetDiscount, this.studentFee,
      this.studentFeeForm.patchValue(this.studentFee)
    );

  }

  updateDisabledFields(fee) {
    const base = ['annualFee', 'admissionCharges', 'baseFee', 'securityDeposit'];
    const final = ['finalAnnualFee', 'finalAdmissionCharges', 'finalBaseFee', 'finalSecurityDeposit'];
    if (this.editable) {
      // fields editable when called for edit
      fee.comment.enable();
      fee.transportFee.enable();
      fee.uniformCharges.enable();
      fee.stationary.enable();

      // enable final fee fields if base fee is valid
      base.forEach((ele, index) => {
        if (fee[ele].value) {
          fee[final[index]].enable();
        }
      });
    } else {
      this.studentFeeForm.disable();
    }
  }
}

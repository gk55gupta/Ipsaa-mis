import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable({ providedIn: 'root' })

export class FeeService {

  constructor(private api: Api) { }
  // student fee service
  loadStudentFeeByCenterId(centerId) {
    return this.api.get('api/student/fee?centerId=' + centerId);
  }
  getStudentFeeById(feeId) {
    return this.api.post('api/student/fee/get', { id: feeId });
  }

  initStudentFee(fee) {
    fee.annualFee = fee.annualFee || 0;
    fee.discountAnnualCharges = fee.discountAnnualCharges || 0;
    fee.finalAnnualFee = fee.discountAnnualCharges
      ? fee.finalAnnualFee
      : fee.annualFee || 0;

    fee.admissionCharges = fee.admissionCharges || 0;
    fee.discountAdmissionCharges = fee.discountAdmissionCharges || 0;
    fee.finalAdmissionCharges = fee.discountAdmissionCharges
      ? fee.finalAdmissionCharges
      : fee.admissionCharges || 0;

    fee.baseFee = fee.baseFee || 0;
    fee.discountBaseFee = fee.discountBaseFee || 0;
    fee.finalBaseFee = fee.discountBaseFee
      ? (fee.finalBaseFee / 3).toFixed(2)
      : fee.baseFee || 0;

    fee.securityDeposit = fee.securityDeposit || 0;
    fee.discountSecurityDeposit = fee.discountSecurityDeposit || 0;
    fee.finalSecurityDeposit = fee.discountSecurityDeposit
      ? fee.finalSecurityDeposit
      : fee.securityDeposit || 0;

    fee.transportFee = fee.transportFee || 0;
    fee.finalTransportFees = fee.transportFee ? fee.transportFee * 3 : 0;

    fee.uniformCharges = fee.uniformCharges || 0;
    fee.stationary = fee.stationary || 0;
  }

  calculateDiscount(base, final, targetDiscount, fee, callback) {
    if (fee[base] > 0 && fee[final]) {
      if (fee[base] - fee[final] > 0) {
        fee[targetDiscount] =
          Number((((fee[base] - fee[final]) / fee[base]) * 100).toFixed(2));
      } else {
        fee[targetDiscount] = 0;
        fee[final] = fee[base];
      }
    } else {
      fee[final] = 0;
      fee[targetDiscount] = 100;
    }

    this.calculateGst(fee);
    this.calculateFinalFee(fee);

    if (callback) {
      callback();
    }
  }

  calculateGst(fee) {
    if (fee.formalSchool) {
      fee.gstFee = fee.finalAnnualFee ? Number((fee.finalAnnualFee * 0.18).toFixed(2)) : 0;
      fee.baseFeeGst = fee.finalBaseFee ? Number((fee.finalBaseFee * 0.18).toFixed(2)) : 0;
    } else {
      fee.gstFee = 0;
      fee.baseFeeGst = 0;
    }
  }

  calculateFinalFee(fee) {
    fee.finalTransportFees = fee.transportFee ? fee.transportFee * 3 : 0;
    let final = 0;
    if (fee.finalAnnualFee > 0) {
      final += Number(fee.finalAnnualFee);
    }
    if (fee.finalAdmissionCharges > 0) {
      final += Number(fee.finalAdmissionCharges);
    }
    if (fee.finalBaseFee > 0) {
      final += Number(fee.finalBaseFee * 3);
    }
    if (fee.finalSecurityDeposit > 0) {
      final += Number(fee.finalSecurityDeposit);
    }
    if (fee.finalTransportFees > 0) {
      final += Number(fee.finalTransportFees);
    }

    if (fee.uniformCharges > 0) {
      final += Number(fee.uniformCharges);
    }

    if (fee.stationary > 0) {
      final += Number(fee.stationary);
    }

    if (fee.gstFee > 0) {
      final += Number(fee.gstFee);
    }

    if (fee.baseFeeGst > 0) {
      final += Number(fee.baseFeeGst);
    }

    fee.finalFee = Number(final.toFixed(2));
  }
}

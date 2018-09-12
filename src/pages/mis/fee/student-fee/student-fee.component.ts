import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { PagerService } from '../../../../providers/pagination/pager.service';
import { FeeService } from '../../../../providers/fee/fee.service';

@Component({
  selector: 'app-student-fee',
  templateUrl: './student-fee.component.html',
  styleUrls: ['./student-fee.component.css']
})

export class StudentFeeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private pagerService: PagerService,
    private feeService: FeeService
  ) {}

  searchedStudent = '';
  selectedCenter = { id: 1 };
  centers = [];
  allItems = [];
  studentFeeList = [];
  selectedStudent = {id: 0};
  editStudentFee = false; // flag to set if edit stuednt fee called
  viewPanel = false;
  loadingFeeList = false;
  pager: any = []; // object for pagination config generated from service
  pagedItems = []; // paginated items will be stored here

  ngOnInit() {
    this.initiallize();
    this.subscribeViewPanelChange();
  }

  initiallize() {
    this.adminService
      .getCenters()
      .subscribe(centers => (this.centers = centers));
  }

  loadStudentFeeByCenter() {
    this.loadingFeeList = true;
    this.feeService
      .loadStudentFeeByCenterId(this.selectedCenter.id)
      .subscribe(res => {
        this.allItems = res;
        this.searchStudent(); // it will handle if any search query or not then display list accordingly
        this.loadingFeeList = false;
      });
  }

  searchStudent() {
    const val = this.searchedStudent;
    if (val !== '') {
      this.studentFeeList = this.allItems.filter(student => {
        return student.fullName.toLowerCase().startsWith(val.toLowerCase());
      });
    } else {
      this.studentFeeList = this.allItems;
    }
  }

  getStudentFee(student, mode) {
    this.selectedStudent = student;
    this.editStudentFee = mode === 'edit' ? true : false;
    this.adminService.viewPanel.next(true);
  }

  subscribeViewPanelChange = () => {
    this.adminService.viewPanel.subscribe((val: boolean) => {
      this.viewPanel = val;
    });
  }
}

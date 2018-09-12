import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import { Student } from '../../modal/student';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  students: Student[];
  public viewPanel = new Subject<boolean>();

  constructor(public api: Api) {}

  getPrograms() {
    return this.api.get('api/program/');
  }

  getCenters() {
    return this.api.get('api/center/');
  }

  getCostCenter() {
    return this.api.get('api/le/');
  }

  getGroups() {
    return this.api.get('api/group/');
  }

  getStudents(body: any) {
    return this.api.post('api/student/filter', body);
  }

  getStudentById(studentId: number) {
    return this.api.get('api/student/' + studentId);
  }

  deleteStudentById(studentId: number) {
    return this.api.delete('api/student/' + studentId);
  }

  getStudentPaymentHistory(studentId: number) {
    return this.api.get('api/student/payments/history/' + studentId);
  }

  // Used by staffComponent
  getStaff() {
    return this.api.get('api/staff/all/');
  }
  getStaffById(staffId: number) {
    return this.api.get('api/staff/' + staffId);
  }
  filterStaff(filter) {
    return this.api.post('api/staff/filter', filter);
  }
  deleteStaffById(staffId) {
    return this.api.delete('api/staff/' + staffId);
  }
  addStaff(reqBody) {
    return this.api.post('api/staff/', reqBody);
  }
  updateStaff(reqbody) {
    return this.api.put('api/staff/', reqbody);
  }
  updateStaffProfilePic(staffId: number, formData: FormData) {
    return this.api.post('api/staff/' + staffId + '/profile-pic', formData);
  }

  getPrivileges() {
    return this.api.get('api/user/my_privileges');
  }

  uploadStudentProfilePic(studentId: number, formData: FormData) {
    return this.api.post('api/student/' + studentId + '/profile-pic', formData);
  }

  updateStudent(student: any) {
    return this.api.put('api/student/', student);
  }

  addStudent(student: any) {
    return this.api.post('api/student/', student);
  }

  saveZone(zone: any) {
    return this.api.post('api/zone/', zone);
  }

  saveCity(city: any) {
    return this.api.post('api/city/', city);
  }

  updateZone(zone: any) {
    return this.api.put('api/zone/', zone);
  }

  updateCity(city: any) {
    return this.api.put('api/city/', city);
  }

  deleteZone(zoneId: any) {
    return this.api.delete('api/zone/' + zoneId);
  }

  deleteCenter(centerId: any) {
    return this.api.delete('api/center/' + centerId);
  }

  deleteCity(cityId: any) {
    return this.api.delete('api/city/' + cityId);
  }

  saveCenter(center) {
    return this.api.post('api/center/', center);
  }

  updateCenter(center) {
    return this.api.put('api/center/', center);
  }

  saveProgram(program: any) {
    return this.api.post('api/program/', program);
  }

  updateProgram(program: any) {
    return this.api.put('api/program/', program);
  }

  saveGroup(group: any) {
    return this.api.post('api/group/', group);
  }

  updateGroup(group: any) {
    return this.api.put('api/group/', group);
  }

  getRoles() {
    return this.api.get('api/user/roles/');
  }

  getAllPrivileges() {
    return this.api.get('api/user/privileges/');
  }

  saveRole(role: any) {
   return this.api.post('api/user/role/', role);
  }

  updateRole(role: any) {
    return this.api.put('api/user/role/', role);
  }

  getUsers() {
  return this.api.get('api/user/');
  }

  getAllCenters() {
    return this.api.get('api/center/all');
  }

  getEmployee() {
    return this.api.post('api/staff/filter', {'active': true} );
  }

  saveUser(user: any) {
    return this.api.post('api/user/', user);
  }

  updateUser(user: any) {
    return this.api.put('api/user/', user);
  }

  resetUserPassword(userIdAndPassword: any) {
    return this.api.post('api/user/resetpwd', userIdAndPassword);
  }

  updateSalary(salary) {
    return this.api.post('api/employee/salary/update', salary);
  }

  getNewEmployees() {
    return this.api.get('api/staff/new');
  }

  getPaySlips(object: any) {
    return this.api.post('api/employee/payslip?month=' + object.month + '&year=' + object.year + '&employerId=' + object.employer, {});
  }

  updatePaySlip(salary: any) {
    return this.api.put('api/employee/payslip/', salary);
  }

  downloadPaySlip(salary: any) {
    return this.api.get('api/employee/payslip/pdf/' + salary.id);
  }

  regeneratePaySlip(salary: any) {
    return this.api.put('api/employee/payslip/regenerate/', salary);
  }

  lockPayslip(paySlip: any) {
    return this.api.put('api/employee/payslip/lock', {id: paySlip.id,
      lock : true});
  }

  getStudentAttendance() {
    return this.api.get('api/attendance/student/');
  }

  clockInStudent(student: any) {
    return this.api.post('api/attendance/student/clockin/', {studentId: student.id});
  }

  clockOutStudent(student: any) {
    return this.api.post('api/attendance/student/clockout/', {studentId: student.id});
  }

  getProgramFee(programNgroup: any) {
    return this.api.post('api/center/fee/', programNgroup);
  }

}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent {

  constructor(
    private service: ApiService, 
    private toastr: ToastrService,
    private router: Router,
    private notifyService: NotificationService) { }

  @Input() depart: any;
  DepartmentId = "";
  DepartmentName = "";

  ngOnInit(): void {
    this.DepartmentId = this.depart.DepartmentId;
    this.DepartmentName = this.depart.DepartmentName;
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Department Added successfully!!", "Add Department");
  }

  showToasterUpdate(){
    this.notifyService.showSuccess("Department Updated successfully!!", "Update Department");
  }

  addDepartment() {
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(dept).subscribe(res => {
      console.log(res);
    });  
    this.showToasterSuccess();
  }
  
  updateDepartment() {
    var deptId = JSON.parse(localStorage.getItem('id')!);
    var dept = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.service.updateDepartment(deptId, dept).subscribe(res => {
      console.log(res);
    });
    this.showToasterUpdate();
  }
}

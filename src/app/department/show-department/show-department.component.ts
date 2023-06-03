import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent implements OnInit {

  constructor(private service: ApiService, private notifyService : NotificationService) { }

  DepartmentList: any = [];
  ModalTitle = "";
  ActivateAddEditDepartComp: boolean = false;
  depart: any;

  ngOnInit(): void { 
    this.deptList();  
  } 

  deptList() {
    this.service.getDepartmentList().subscribe(data => {
      this.DepartmentList = data;  
      console.log(this.DepartmentList);   
    });
  }

  addClick() {
    this.depart = {
      DepartmentId: "0",
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepartComp = true;   
  }

  editClick(item: any) {
    this.depart = item;
    localStorage.setItem('id', item.departmentID);   
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepartComp = true;
  }

  deleteClick(item: any) {      
    this.service.deleteDepartment(item.departmentID).subscribe(data => {
      console.log(data);
      this.deptList();
    })
    this.showToasterWarning();     
  }
  
  closeClick() {
    this.ActivateAddEditDepartComp = false;
    this.deptList();
  }
 
  showToasterWarning(){
    this.notifyService.showWarning("Department deleted successfully", "Department");
}

}

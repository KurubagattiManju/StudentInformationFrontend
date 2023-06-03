import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent {
  constructor(private service: ApiService, private notifyService: NotificationService) { }

  StudentList: any = [];
  ModalTitle = "";
  ActivateAddEditStdComp: boolean = false;
  std: any;

  ngOnInit(): void { 
    this.studentList();  
  }

  studentList() {
    this.service.getStudentList().subscribe(data => {
      this.StudentList = data;         
    });
  }

  addClick() {
     this.std = {
      StudentId: "0",
      StudentName: "",
      Course: "",
      Specialization: "",
      Percentage: "",
      DepartmentId:""
    }
    this.ModalTitle = "Add Student";
    this.ActivateAddEditStdComp = true;        
  }

  editClick(item: any) {
    this.std = item;
    localStorage.setItem('id', item.studentID);   
    this.ModalTitle = "Edit Student";
    this.ActivateAddEditStdComp = true;
  }

  deleteClick(item: any) {    
      this.service.deleteStudent(item.studentID).subscribe(data => {
        console.log(data);
        this.studentList();
      })
    this.showToasterWarning();
  }
  
  closeClick() {
    this.ActivateAddEditStdComp = false;
    this.studentList();
  }

  showToasterWarning(){
    this.notifyService.showWarning("Student deleted successfully", "Student");
}
  
}

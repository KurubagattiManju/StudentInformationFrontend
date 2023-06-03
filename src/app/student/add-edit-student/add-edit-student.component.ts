import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';
  
@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

  constructor(private service: ApiService, private notifyService: NotificationService) { }
  @Input() std: any;
  StudentId:number = 0;
  StudentName:string = "";
  Course:string = "";
  Specialization:string = "";
  Percentage:number = 0;
  DepartmentId:number = 0;

  StudentList: any = [];

  ngOnInit(): void {   
  } 

  showToasterSuccess(){
    this.notifyService.showSuccess("Student Added successfully!!", "Add Student");
  }

  showToasterUpdate(){
    this.notifyService.showSuccess("Student Updated successfully!!", "Update Student");
  }

  addStudent() {   
    const val = {
      studentID: this.StudentId,
      studentName: this.StudentName,
      course: this.Course,
      specialization: this.Specialization,
      percentage: this.Percentage,
      departmentID: this.DepartmentId     
    };

    this.service.addStudent(val).subscribe(res => {
     console.log(res);
    });
    this.showToasterSuccess();
  }

  updateStudent() {
    var studentId = JSON.parse(localStorage.getItem('id')!);
    const val = {
      studentID: this.StudentId,
      studentName: this.StudentName,
      course: this.Course,
      specialization: this.Specialization,
      percentage: this.Percentage,
      departmentID: this.DepartmentId     
    };

    this.service.updateStudent(studentId, val).subscribe(res => {
      console.log(res);
    });
    this.showToasterUpdate();
  }
  
}

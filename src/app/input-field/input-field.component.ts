import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditTaskValueService } from '../Services/edit-task-value.service';
import { AllHttpRequestsService } from '../Services/all-http-requests.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  titleHead: string = (this.editTaskValueService.toEditBoolean) ? "EditTask" : "AddTask";
  addOrEdit = (this.editTaskValueService.toEditBoolean) ? "Edit" : "Add";

  constructor(private http: HttpClient, private editTaskValueService: EditTaskValueService, private router: Router, private allHttp: AllHttpRequestsService) {
    console.log(editTaskValueService.getValue());
  }

  todoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dueDate: new FormControl('')
  })


  ngOnInit(): void {
    if (this.editTaskValueService.toEditBoolean) {
      this.addOrEdit = "Edit"
      const data = this.editTaskValueService.getValue();
      this.todoForm.get('title')?.setValue(data.title);
      this.todoForm.get('description')?.setValue(data.description);
      this.todoForm.get('dueDate')?.setValue(data.dueDate);
    }
  }


  addOrEditTask() {
    // checking localStorage

    if (localStorage.getItem("token") != null) {

      let taskDetails = { "title": this.todoForm.value.title, "description": this.todoForm.value.description, "dueDate": this.todoForm.value.dueDate }

      console.log(taskDetails);
      if (this.editTaskValueService.toEditBoolean) {
        // UPDATE
        this.allHttp.updateTask(taskDetails).subscribe();
        this.editTaskValueService.toEditBoolean = false;
        this.router.navigate(['tasklist']);
      }
      else {
        // CREATE
        console.log(this.todoForm.value);
        this.allHttp.createTask(taskDetails).subscribe((res: any) => {
            alert(res.message);
          });
      }
      this.todoForm.reset();
    }
    else {
      alert("Login required");
      this.router.navigate(['login']);
    }
  }

  get title() {  // for validation
    return this.todoForm.get('title');
  }

  get description() {
    return this.todoForm.get('description');
  }

  get dueDate() {
    return this.todoForm.get('dueDate');
  }

}


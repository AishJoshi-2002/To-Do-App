import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditTaskValueService } from '../Services/edit-task-value.service';
import { TaskListService } from '../Services/task-list.service';
import { AllHttpRequestsService } from '../Services/all-http-requests.service';

@Component({
  selector: 'app-task-operations',
  templateUrl: './task-operations.component.html',
  styleUrls: ['./task-operations.component.css']
})
export class TaskOperationsComponent implements OnInit {

  constructor(private http: HttpClient , private editTaskValueService: EditTaskValueService, private router : Router, private allHttp: AllHttpRequestsService) { }

  allTaskList: TaskListService[] = []; // display data in table

  ngOnInit(): void {
    // alert("Fetching todo's...");
    this.allHttp.fetchTask().subscribe((taskList:any)=>{ // callback function: receiving response
      this.allTaskList = taskList;
    }, (err)=>{
      alert("Unable to fetch todo's");
    });
  }

  editTask(id: any, todoValues: any){
    // alert("Let's edit...");
    this.editTaskValueService.setValue(todoValues);
    this.router.navigate(['addtask']);
  }

  showList(){
    this.allHttp.fetchTask().subscribe((taskList:any)=>{ // callback function: receiving response
      this.allTaskList = taskList;
    }, (err)=>{
      alert("Unable to fetch todo's");
    });
  }

  doneTask(id: any){
    this.allHttp.taskDone(id).subscribe((res)=>{
      alert("Task marked as done");
      this.showList();
    }, (err)=>{
      console.log(err)
      alert("Unable to mark as done");
    });
  }

  clearList(){ 
    alert("Clearing todo's list...");
    this.allHttp.emptyList().subscribe((res)=>{
      alert("List cleared");
    }, (err)=>{
      alert("Unable to clear list");
    });
  }

}


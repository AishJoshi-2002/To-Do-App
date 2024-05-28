import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TaskListService } from '../Services/task-list.service';
import { AllHttpRequestsService } from '../Services/all-http-requests.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private allHttp: AllHttpRequestsService) { }

  allTaskList: TaskListService[] = []; // display data in table

  ngOnInit(): void {
    this.allHttp.compList().subscribe((taskList: any) => { // callback function: receiving response
        this.allTaskList = taskList;
      }, (err) => {
        alert("Unable to fetch todo's");
      });
  }

}


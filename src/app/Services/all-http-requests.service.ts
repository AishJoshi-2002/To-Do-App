import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditTaskValueService } from './edit-task-value.service';
import { TaskListService } from './task-list.service';

@Injectable({
  providedIn: 'root'
})
export class AllHttpRequestsService {

  constructor(private http: HttpClient, private editTaskValueService: EditTaskValueService) { }

  logIn(token: any){
    return this.http.post('http://localhost:3000/api/login', {}, { headers: { "Authorization": `Basic ${token}` } })
  }

  signUp(token: any){
    return this.http.post('http://localhost:3000/api/signup', {}, {headers:{"Authorization": `Basic ${token}` } });
  }

  updateTask(taskDetails: any){
    return this.http.patch('http://localhost:3000/api/edit', taskDetails, { headers: { "Authorization": `Basic ${localStorage.getItem("token")}`, "id": "" + this.editTaskValueService.getValue().id } });
  }

  createTask(taskDetails: any){
    return this.http.post('http://localhost:3000/api/addTask', taskDetails, { headers: { "Authorization": `Basic ${localStorage.getItem("token")}` } });
  }

  fetchTask(){
    return this.http.post<{[key: string]: TaskListService}>('http://localhost:3000/api/fetch', {}, {headers:{"Authorization": `Basic ${localStorage.getItem("token")}`}});
  }

  taskDone(id: any){
    return this.http.delete(`http://localhost:3000/api/done`, {headers:{"Authorization": `Basic ${localStorage.getItem("token")}`,"id":""+id}});
  }

  emptyList(){
    return this.http.delete('http://localhost:3000/api/delete', {headers:{"Authorization": `Basic ${localStorage.getItem("token")}`}});
  }

  compList(){
    return this.http.post<{ [key: string]: TaskListService }>('http://localhost:3000/api/fetchcomp', {}, { headers: { "Authorization": `Basic ${localStorage.getItem("token")}`}});
  }

}


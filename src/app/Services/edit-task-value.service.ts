import { Injectable } from '@angular/core';
import { TaskListService } from './task-list.service';

@Injectable({
  providedIn: 'root'
})
export class EditTaskValueService {

  taskToEdit!: TaskListService;
  toEditBoolean = false;
  setValue(task:TaskListService){
    this.toEditBoolean = true;
    this.taskToEdit = task;
  }
  getValue(){
    return this.taskToEdit;
  }
}

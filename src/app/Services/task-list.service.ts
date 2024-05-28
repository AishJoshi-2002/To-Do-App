import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor() { }
    id!:number;
    title!: string;
    description!: string;
    createDate!: string;
    dueDate!: string;
    compDate!: string;
}

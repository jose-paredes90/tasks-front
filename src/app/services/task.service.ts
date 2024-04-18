import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { TaskRequestDto } from '../models/task.request.dto';
import { v4 as uuidv4 } from 'uuid';
import { TaskDto } from '../models/task.dto';
import { fromTextToDate } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly storage: LocalStorageService
  ) { }

  postTask(request: TaskRequestDto): TaskDto {
    const tasks = this.getTasks();
    const dto: TaskDto = {
      ...request,
      id: uuidv4()
    }
    tasks.push(dto);
    this.storage.put('tasks', JSON.stringify(tasks))
    return dto;
  }

  getTasks(): TaskDto[] {
    const tasks: TaskDto[] = JSON.parse(this.storage.get('tasks') ?? null!) ?? [];
    return tasks.map(item => {
      return {
        ...item,
        dueDate: fromTextToDate(item.dueDate.toString())
      }
    });
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id == id);
    tasks.splice(index, 1);
    this.storage.put('tasks', JSON.stringify(tasks))
  }

  putTask(id: string, request: TaskRequestDto): TaskDto {
    const dto: TaskDto = {
      ...request,
      id
    }
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id == id);
    tasks.splice(index, 1, dto);
    this.storage.put('tasks', JSON.stringify(tasks))
    return dto;
  }

}

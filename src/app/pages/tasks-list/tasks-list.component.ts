import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksFormComponent } from 'src/app/components/tasks-form/tasks-form.component';
import { TaskDto } from 'src/app/models/task.dto';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  taskList: TaskDto[] = [];
  priority: FormControl = new FormControl();
  state: FormControl = new FormControl();

  orderControl = new FormControl();

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskList = this.taskService.getTasks();
  }

  private _range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  public get range() {
    return this._range;
  }

  public set range(value) {
    this._range = value;
  }

  get tasksTable() {
    const priority = this.priority.value;
    const startDate = this._range.get('start')?.value;
    const endDate = this._range.get('end')?.value;
    const state = this.state.value;
    let tasks = [...this.taskList];
    if (priority){
      tasks = tasks.filter(task => task.priority == priority);
    }
    if (startDate && endDate) {
      tasks = tasks.filter(task => task.dueDate >= startDate && task.dueDate <= endDate);
    }
    if (state) {
      tasks = tasks.filter(task => task.state == state);
    }

    return tasks;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TasksFormComponent, {
      width: '700px',
    });

    dialogRef
      .afterClosed()
      .subscribe((response: { edit: boolean; task: TaskDto }) => {
        if (!response?.edit) {
          this.taskList.push(response.task);
        }
      });
  }

  removeTask(id: string) {
    const index = this.taskList.findIndex((task) => task.id == id);
    this.taskList.splice(index, 1);
  }

  editTask(task: TaskDto) {
    const index = this.taskList.findIndex((task) => task.id == task.id);
    this.taskList.splice(index, 1, task);
  }
}

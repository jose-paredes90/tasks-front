import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskDto } from 'src/app/models/task.dto';
import { ModalDeleteComponent } from '../../shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-tasks-card',
  templateUrl: './tasks-card.component.html',
  styleUrls: ['./tasks-card.component.css'],
})
export class TasksCardComponent {
  @Input() task!: TaskDto;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<TaskDto>();

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  edit(task: TaskDto) {
    this.dialog.open(TasksFormComponent, {
      width: '700px',
      data: {...task}
    }).afterClosed().subscribe((response: {edit: boolean, task: TaskDto}) => {
      if (response?.edit) {
        this.taskEdited.emit(response.task);
      }
    });
    
  }

  deleteTask(task: TaskDto) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250',
      data: task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(task.id);
        this.taskDeleted.emit(task.id);
      }
    });
  }
}

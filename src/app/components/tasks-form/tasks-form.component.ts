import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskDto } from 'src/app/models/task.dto';
import { TaskRequestDto } from 'src/app/models/task.request.dto';
import { TaskService } from 'src/app/services/task.service';
import { StateEnum } from 'src/app/shared/enums/state.enum';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent {
  taskForm!: FormGroup;
  tags: string[] = [];

  announcer = inject(LiveAnnouncer);

  constructor(private dialogRef: MatDialogRef<TasksFormComponent>, 
    private taskService: TaskService, @Inject(MAT_DIALOG_DATA) public task: TaskDto,
  ) {
    this.createForm(task);  
  }

    createForm(task: TaskDto) {
      this.taskForm = new FormGroup({
        title: new FormControl(task?.title, [Validators.required]),
        description: new FormControl(task?.description, [Validators.required]),
        dueDate: new FormControl(task?.dueDate, [Validators.required]),
        priority: new FormControl(task?.priority, [Validators.required]),
        tags: new FormControl(task?.tags, [Validators.required]),
        state: new FormControl(task?.state | StateEnum.PENDIENTE, [Validators.required])
      });
      if (task?.tags?.length > 0) {
        this.tags = [...task.tags];
      }
    }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`removed ${tag}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  saveTask() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      const request: TaskRequestDto = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        tags: task.tags,
        state: task.state
      }
      if (this.task) {
        const taskDto = this.taskService.putTask(this.task.id, request);
        this.close(true, taskDto);
      } else {
        const taskDto = this.taskService.postTask(request);
        this.close(false, taskDto);
      }
    }
  }

  close(edit?: boolean, task?: TaskRequestDto ): void {
    this.dialogRef.close({edit, task});
  }
}

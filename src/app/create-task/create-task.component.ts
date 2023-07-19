import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  newTask: Task = {
    id: '',
    title: '',
    description: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    status: 'to do',
    assigneeName: ''
  };
  statuses: { value: string; label: string; class: string }[] = [
    { value: 'to do', label: 'To Do', class: 'bg-danger' },
    { value: 'in progress', label: 'In Progress', class: 'bg-warning' },
    { value: 'done', label: 'Done', class: 'bg-success' }
  ];

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit() {
    this.taskService.createTask(this.newTask).subscribe(
      response => {
        console.log('New task created:', response);
        this.router.navigate(['/task-list']); // Yeni görev oluşturulduktan sonra task-list sayfasına yönlendir
      },
      error => {
        console.error('Create error:', error);
      }
    );
  }

  cancelCreate() {
    this.router.navigate(['/task-list']); // Yeni görev oluşturma işlemi iptal edildiğinde task-list sayfasına yönlendir
  }
}
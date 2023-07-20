import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: Task | null = null; 
  showCreateForm: boolean = false;
  user="";
  newTask: Task = {
    title: '',
    description: '',
    assigneeName: '',
    status: 'to do',
    state:true
  };


   statuses: { value: string; label: string; class: string }[] = [
    { value: 'to do', label: 'To Do', class: 'bg-danger' },
    { value: 'in progress', label: 'In Progress', class: 'bg-warning' },
    { value: 'done', label: 'Done', class: 'bg-success' }
  ];

  constructor(private authService: AuthService,private router: Router,private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
    localStorage.removeItem('token');
    localStorage.setItem('token','login');
   this.user= localStorage.getItem('token');

  }
  logout(): void {
    // AuthService kullanarak oturumu sonlandır
    this.authService.logout();

    // Login sayfasına yönlendir
    this.router.navigate(['/login']);
  }

  updateStatus(task: any, event: any) {
    task.status = event.target.value;
    this.updateTask(task);
  }
  
  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(
      response => {
        console.log('Task updated:', response);
        this.selectedTask = null; // Formu gizle
        alert('Task successfully updated.'); // Başarı mesajı
      },
      error => {
        console.error('Update error:', error);
      }
    );
  }
    
  
  

  cancelEdit() {
    this.selectedTask = null; // Clear the selectedTask to exit the edit mode
  }
  
  showTaskDetails(task: Task) {
    alert(task.description); // or any other method to display the task details
  }
  editTask(task: Task) {
    this.selectedTask = task;
  }

  getStatusClass(status: string) {
    if (status === 'done') {
      return 'table-success';
    } else if (status === 'in progress') {
      return 'table-warning';
    }
     

     else {
      return '';
    }
  }
  createNewTask() {
    this.showCreateForm = true;
  }
  saveTask(newTask: Task) {
    this.taskService.createTask(newTask).subscribe(
      response => {
        console.log('New task created:', response);
        this.getTasks(); // Refresh the task list after creating a new task
        this.cancelCreate();
      },
      error => {
        console.error('Create error:', error);
      }
    );
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newTask = {
      title: '',
      description: '',
      assigneeName: '',
      status: 'to do'
    };
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        const username = localStorage.getItem('username');
        tasks.forEach((task) => {if(task.assigneeName != username) {
          
          task.state = true;}});
        this.tasks = tasks;
      },
      error => {
        console.error('Get tasks error:', error);
      }
    );
  }
}

 
  
  

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5226/api/Task';
  
  constructor(private http: HttpClient) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
}
createTask(task: Task): Observable<Task> {
  return this.http.post<Task>(this.baseUrl, task);
}

updateTask(task: any): Observable<any> {
  const updateUrl = `${this.baseUrl}/${task.id}`; // Modify the URL to include the task ID
    return this.http.put<Task>(updateUrl, task);
  }

deleteTask(taskId: number): Observable<any> {
  const url = `${this.baseUrl}/${taskId}`;
  return this.http.delete<any>(url);
}
}
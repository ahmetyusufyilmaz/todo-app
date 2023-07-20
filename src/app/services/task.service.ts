import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5226/api/Task';
  
  constructor(private http: HttpClient) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl)
    .pipe(
      catchError(this.handleError)
    );
}
createTask(task: Task): Observable<Task> {
  return this.http.post<Task>(this.baseUrl, task)
  .pipe(
    catchError(this.handleError));
    console.log('asda');
}

updateTask(task: any): Observable<any> {
  const updateUrl = `${this.baseUrl}/${task.id}`; // Modify the URL to include the task ID
    return this.http.put<Task>(updateUrl, task);
  }

deleteTask(taskId: number): Observable<any> {
  const url = `${this.baseUrl}/${taskId}`;
  return this.http.delete<any>(url);
}
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}}
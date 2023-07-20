import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';
  
  redirectUrl: string;

  constructor(
    private http: HttpClient,
  ) { }
  isLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';}
  login(): void {
    localStorage.setItem(this.isLoggedInKey, 'true');
  }
  
  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
    
  }
}
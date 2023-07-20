import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onSubmit() {
    if (this.username.trim() !== '') {
      localStorage.setItem('username', this.username.trim());
      this.authService.login();
      this.router.navigate(['/task-list']);
     
    } else {
      // Kullanıcı adı alanı boşsa, burada gerekli işlemleri yapabilirsiniz.
      // Örneğin, bir uyarı gösterebilir veya hata mesajı verebilirsiniz.
      console.log('Username field is required!');
    }
  }
}
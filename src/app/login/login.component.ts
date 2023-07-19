import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username.trim() !== '') {
      localStorage.setItem('username', this.username.trim());
      this.router.navigate(['/task-list']);
    } else {
      // Kullanıcı adı alanı boşsa, burada gerekli işlemleri yapabilirsiniz.
      // Örneğin, bir uyarı gösterebilir veya hata mesajı verebilirsiniz.
      console.log('Username field is required!');
    }
  }
}
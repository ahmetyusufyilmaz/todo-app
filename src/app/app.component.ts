import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app';

  constructor(
  public authService: AuthService,
  public router: Router,
) {}

logout () {
  this.authService.isLoggedIn = false;
  this.router.navigateByUrl('');
}
}

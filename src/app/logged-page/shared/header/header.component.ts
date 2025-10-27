import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  userName = '';
  showUserMenu = false;

  constructor(private loginService: LoginService){
    const user = this.loginService.getCurrentUser();
    this.userName = user.name;
  }

   logout() {
    try {
      localStorage.clear();
      this.router.navigate(['login']);
    } catch (error: any) {
      console.error('Unexpected error during login:', error);
    }
  }
}

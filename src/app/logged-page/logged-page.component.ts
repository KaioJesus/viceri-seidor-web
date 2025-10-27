import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule],
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.css']
})
export class LoggedPageComponent implements OnInit{

  private router = inject(Router)

  menuItems = [
  ];

  ngOnInit(): void {
  }

}

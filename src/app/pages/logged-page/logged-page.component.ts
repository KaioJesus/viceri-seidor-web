import { HeaderComponent } from "../../components/header-component/header-component";
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-logged-page',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule, HeaderComponent],
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.css']
})
export class LoggedPageComponent implements OnInit{

  private router = inject(Router)

  ngOnInit(): void {
  }

}

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="flex justify-between items-center px-4 h-16">
        <div class="flex items-center space-x-8">
          <a routerLink="/" class="text-base font-semibold text-gray-800">
            Sigae Lite
          </a>

          @if (isLoggedIn()) {
          <div class="hidden md:flex space-x-4">
            <a
              routerLink="/pessoas"
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="flex gap-2 items-center px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <span class="pi pi-user"></span>
              <span>Pessoas</span>
            </a>
            <a
              routerLink="/agenda"
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="flex gap-2 items-center px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <span class="pi pi-calendar"></span>
              <span>Agenda</span>
            </a>
            <a
              routerLink="/planos-de-acao"
              routerLinkActive="text-blue-600 border-b-2 border-blue-600"
              class="flex gap-2 items-center px-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <span class="pi pi-copy"></span>
              <span>Plano de Ação</span>
            </a>
          </div>
          }
        </div>

        <div class="flex items-center">
          @if (isLoggedIn()) {
          <button
            (click)="onLogout()"
            class="flex gap-2 items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <span class="pi pi-power-off"></span>
            <span>Quit</span>
          </button>
          } @else {
          <a
            routerLink="/login"
            class="px-4 py-2 font-medium text-gray-500 rounded-md hover:text-gray-900 ease-in-out duration-150 cursor-pointer text-base"
          >
            Login
          </a>
          }
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  isLoggedIn = this.loginService.isLoggedIn;

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}

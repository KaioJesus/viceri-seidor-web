import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/guards/auth.guard';;

export const routes: Routes = [
   {
      path: '',
      component: LoginComponent,
  },
  {
      path: 'home',
      canActivate: [authGuard],
      loadChildren: () =>
        import('./logged-page/logged-page.routes').then(
          m => m.loggedPageRoutes
        )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

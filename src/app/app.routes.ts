import { HomepageComponent } from "./pages/homepage/hompeage-component";
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';;

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
   {
      path: 'login',
      component: LoginComponent,
  },
  {
      path: 'home',
      canActivate: [authGuard],
      loadChildren: () =>
        import('./pages/logged-page/logged-page.routes').then(
          m => m.loggedPageRoutes
        )
  },
  {
    path: '**',
    redirectTo: ''
  }
];

import { Routes } from '@angular/router';
import { LoggedPageComponent } from './logged-page.component';
import { authGuard } from '../../core/guards/auth.guard';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { Agenda } from './components/agenda/agenda';
import { PlanosDeAcao } from './components/planos-de-acao/planos-de-acao';
import { pessoasRoutes } from './components/pessoas/pessoas.route';


export const loggedPageRoutes: Routes = [
  {
      path: '',
      loadComponent:()=>
        import('./logged-page.component').then(m => m.LoggedPageComponent),
      canActivate:[authGuard],
      children: [
        {
          path: 'pessoas',
           loadChildren: () =>
          import(
            './components/pessoas/pessoas.route'
          ).then(m => m.pessoasRoutes),
          title: 'Pessoas',
        },
        {
          path: 'agenda',
           loadComponent: () =>
          import(
            './components/agenda/agenda'
          ).then(m => m.Agenda),
          title: 'Agenda',
        },
        {
          path: 'planos-de-acao',
           loadComponent: () =>
          import(
            './components/planos-de-acao/planos-de-acao'
          ).then(m => m.PlanosDeAcao),
          title: 'Planos de ação',
        },
      ]
    },
  {
    path: '**',
    redirectTo: ''
  }
];

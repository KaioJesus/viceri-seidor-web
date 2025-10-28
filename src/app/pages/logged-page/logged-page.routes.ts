import { Routes } from '@angular/router';
import { LoggedPageComponent } from './logged-page.component';
import { authGuard } from '../../core/guards/auth.guard';


export const loggedPageRoutes: Routes = [
  {
      path: '',
      loadComponent:()=>
        import('./logged-page.component').then(m => m.LoggedPageComponent),
      canActivate:[authGuard],
      children: [
        // {
        //   path: 'eventos/details/:id',
        //    loadComponent: () =>
        //   import(
        //     './events/detail-events/detail-events.component'
        //   ).then(m => m.DetailEventsComponent),
        //   title: 'Detalhes do evento',
        // },
        // {
        //   path: 'planos-de-leitura/details/:id',
        //   loadComponent: ()=> import('./reading-plans/details-reading-plans/details-reading-plans.component').then(m => m.DetailsReadingPlansComponent),
        //   title: 'Detalhes do plano de leitura'
        // },
      ]
    },
  {
    path: '**',
    redirectTo: ''
  }
];

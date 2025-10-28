import { Routes } from '@angular/router';
import { PessoasComponent } from './pessoas.component';
import { PessoaFormComponent } from './components/pessoas-form/pessoa-form.component';

export const pessoasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pessoas.component').then(c => c.PessoasComponent),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/pessoas-form/pessoa-form.component').then(
        c => c.PessoaFormComponent
      ),
      title: 'Cadastro de Pessoa',
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/pessoas-form/pessoa-form.component').then(
        c => c.PessoaFormComponent
      ),
      title: 'Editar pessoa',
  },
];

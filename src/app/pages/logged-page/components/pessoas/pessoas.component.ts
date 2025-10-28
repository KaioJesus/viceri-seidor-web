import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { PessoasService } from '../../../../core/services/pessoas.service';
import { Person } from '../../../../core/models/models';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  standalone: true,
})
export class PessoasComponent {

  private pessoasService = inject(PessoasService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public pessoas = this.pessoasService.pessoas;
  public loading = this.pessoasService.loading;

  public isEmpty = computed(() => this.pessoas().length === 0);

  onAdd() {
    this.router.navigate(['/pessoas/novo'])
  }

  onEdit(pessoa: Person) {
    this.router.navigate(['/pessoas/editar', pessoa.id]);
  }

  onDelet(pessoa: Person) {
    if (confirm(`Tem certeza que deseja excluir ${pessoa.name}?`)) {
      this.pessoasService.deletePessoa(pessoa.id);
    }
  }

}

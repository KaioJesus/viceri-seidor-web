import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Person } from '../models/models';

interface PessoasState {
  pessoas: Person[];
  loading: boolean;
  error: string | null;
}

const MOCK_PESSOAS: Person[] = [
  { id: 'p1', name: 'John Due', cpf: '111.111.111-99', email: 'johndue@email.com', school: 'Escola 1', address: 'Cidade - Estado' },
  { id: 'p2', name: 'Jane Smith', cpf: '222.222.222-99', email: 'janesmith@email.com', school: 'Escola 2', address: 'Cidade - Estado' },
  { id: 'p3', name: 'Robert Brown', cpf: '333.333.333-99', email: 'robertb@email.com', school: 'Escola 1', address: 'Cidade - Estado' },
  { id: 'p4', name: 'Emily Davis', cpf: '444.444.444-99', email: 'emilyd@email.com', school: 'Escola 3', address: 'Cidade - Estado' },
];

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private state: WritableSignal<PessoasState> = signal<PessoasState>({
    pessoas: [],
    loading: false,
    error: null,
  });

  public pessoas: Signal<Person[]> = computed(() => this.state().pessoas);
  public loading: Signal<boolean> = computed(() => this.state().loading);
  public error: Signal<string | null> = computed(() => this.state().error);

  constructor() {
    this.loadPessoas();
  }

  public loadPessoas(): void {
    this.state.set({ pessoas: MOCK_PESSOAS, loading: false, error: null });
  }

  public addPessoa(pessoa: Omit<Person, 'id'>): void {
    const novaPessoa: Person = {
      ...pessoa,
      id: `p${Math.floor(Math.random() * 1000)}`
    };

    this.state.update(s => ({
      ...s,
      pessoas: [...s.pessoas, novaPessoa]
    }));
  }

  public deletePessoa(id: string): void {
    this.state.update(s => ({
      ...s,
      pessoas: s.pessoas.filter(p => p.id !== id)
    }));

  }
}

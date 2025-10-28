import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Person } from '../models/models';

interface PessoasState {
  pessoas: Person[];
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'sigae_pessoas_data';

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
    this.loadPessoasFromStorage();
  }

  private loadPessoasFromStorage(): void {
    let initialPessoas: Person[] = [];

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        initialPessoas = JSON.parse(storedData) as Person[];
      }

    } catch (e) {
      console.error("Falha ao ler o localStorage, iniciando com lista vazia.", e);
    }

    this.state.set({ pessoas: initialPessoas, loading: false, error: null });
  }

  private saveToStorage(pessoas: Person[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pessoas));
    } catch (e) {
      console.error("Falha ao salvar no localStorage.", e);
    }
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

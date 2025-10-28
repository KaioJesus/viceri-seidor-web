import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Meeting } from '../models/models';

interface AgendaState {
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = 'sigae_agenda_data';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private state: WritableSignal<AgendaState> = signal<AgendaState>({
    meetings: [],
    loading: false,
    error: null,
  });

  public meetings: Signal<Meeting[]> = computed(() => this.state().meetings);
  public loading: Signal<boolean> = computed(() => this.state().loading);

  constructor() {
    this.loadMeetingsFromStorage();
  }

  private loadMeetingsFromStorage(): void {
    let initialMeetings: Meeting[] = [];
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        initialMeetings = JSON.parse(storedData) as Meeting[];
      }
    } catch (e) {
      console.error("Falha ao ler agenda do localStorage", e);
    }
    this.state.set({ meetings: initialMeetings, loading: false, error: null });
  }

  private saveToStorage(meetings: Meeting[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
    } catch (e) {
      console.error("Falha ao salvar agenda no localStorage", e);
    }
  }


  public addMeeting(meeting: Omit<Meeting, 'id' | 'status'>): void {
    const newMeeting: Meeting = {
      ...meeting,
      id: `m${Math.floor(Math.random() * 1000)}`,
      status: 'agendado',
    };

    this.state.update(currentState => {
      const novaLista = [...currentState.meetings, newMeeting];
      this.saveToStorage(novaLista);
      return { ...currentState, meetings: novaLista };
    });
  }

  public deleteMeeting(id: string): void {
    this.state.update(currentState => {
      const novaLista = currentState.meetings.filter(m => m.id !== id);
      this.saveToStorage(novaLista);
      return { ...currentState, meetings: novaLista };
    });
  }
}

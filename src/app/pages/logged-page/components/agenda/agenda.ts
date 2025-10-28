import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
  ViewChild,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AgendaService } from '../../../../core/services/agenda.service';
import { Meeting } from '../../../../core/models/models';

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
         date.getMonth() === tomorrow.getMonth() &&
         date.getFullYear() === tomorrow.getFullYear();
}


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterLink, FullCalendarModule],
  templateUrl: './agenda.html',
})

export class Agenda {
  private agendaService = inject(AgendaService);

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  @ViewChild('miniCalendar') miniCalendarComponent!: FullCalendarComponent;

  private meetings: Signal<Meeting[]> = this.agendaService.meetings;

  public currentDate: WritableSignal<Date> = signal(new Date());

  public readonly monthOptions = [
    { name: 'Janeiro', value: 0 },
    { name: 'Fevereiro', value: 1 },
    { name: 'Março', value: 2 },
    { name: 'Abril', value: 3 },
    { name: 'Maio', value: 4 },
    { name: 'Junho', value: 5 },
    { name: 'Julho', value: 6 },
    { name: 'Agosto', value: 7 },
    { name: 'Setembro', value: 8 },
    { name: 'Outubro', value: 9 },
    { name: 'Novembro', value: 10 },
    { name: 'Dezembro', value: 11 },
  ];

  public calendarEvents: Signal<EventInput[]> = computed(() => {
    return this.meetings().map((meeting: Meeting) => ({
      id: meeting.id,
      title: meeting.title,
      start: meeting.dateTime,
    }));
  });

  public calendarOptions: Signal<CalendarOptions> = computed(() => ({
    plugins: [dayGridPlugin as any],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    events: this.calendarEvents(),
    height: 'auto',
    initialDate: this.currentDate(),
    datesSet: (arg) => {
      const newDate = arg.view.currentStart;
      // ajustar fuso horário (comum no FullCalendar)
      const adjustedDate = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000);
      if (adjustedDate.getMonth() !== this.currentDate().getMonth()) {
        this.currentDate.set(adjustedDate);
      }
    }
  }));

    public miniCalendarOptions: Signal<CalendarOptions> = computed(() => ({
    plugins: [dayGridPlugin as any],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    height: 'auto',
    initialDate: this.currentDate(),
    // Formato dos dias da semana
    dayHeaderFormat: { weekday: 'narrow' },
    weekNumbers: false,
    dateClick: this.onMiniCalendarDateClick.bind(this),
    showNonCurrentDates: true,
  }));

  public todayEvents: Signal<Meeting[]> = computed(() =>
    this.meetings().filter(m => isToday(new Date(m.dateTime)))
  );

  public tomorrowEvents: Signal<Meeting[]> = computed(() =>
    this.meetings().filter(m => isTomorrow(new Date(m.dateTime)))
  );

  constructor(){
    effect(() => {
      const newDate = this.currentDate();
      if (this.calendarComponent) {
        this.calendarComponent.getApi().gotoDate(newDate);
      }

      if (this.miniCalendarComponent) {
        this.miniCalendarComponent.getApi().gotoDate(newDate);
      }
    });
  }

    onMonthChange(event: Event): void {
    const newMonthIndex = parseInt((event.target as HTMLSelectElement).value, 10);
    this.currentDate.update(date => {
      const newDate = new Date(date);
      newDate.setMonth(newMonthIndex);
      return newDate;
    });
  }

  onMiniCalendarDateClick(arg: DateClickArg): void {
    this.currentDate.set(arg.date);
  }

  onAddEvent(): void {
    const mockMeeting: Omit<Meeting, 'id' | 'status'> = {
      title: 'Novo Evento Teste',
      dateTime: new Date().toISOString(),
      type: 'remota',
      location: 'https://meet.google.com',
      participants: ['teste@gmail.com']
    };
    this.agendaService.addMeeting(mockMeeting);
  }

}

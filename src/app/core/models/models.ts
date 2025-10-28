export interface User {
  name: string;
}

export interface Person {
  id: string;
  name: string;
  cpf: string;
  email: string;
  school: string;
  address: string;
}

export type MeetingType = 'presencial' | 'remota';
export type MeetingStatus = 'agendado' | 'concluido' | 'cancelado';

export interface Meeting {
  id: string;
  title: string;
  dateTime: Date | string;
  type: MeetingType;
  location: string;
  participants: string[];
  status: MeetingStatus;
  relatedPlanId?: string | null;
}

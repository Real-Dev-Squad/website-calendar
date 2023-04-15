import { Event, stringOrDate } from 'react-big-calendar';

export interface Attendees {
  attendee: {
    name: string;
    email: string;
  };
}
export interface CalEvent extends Event {
  id?: number;
  description?: string;
  location?: string;
  type?: 'public' | 'private';
  ownerId?: number;
  calendarId?: number;
  attendees?: Attendees[];
}

export interface CalendarEventProps {
  show?: boolean;
  event?: CalEvent;
  new?: boolean;
}

export interface UpdateEvent {
  event: CalEvent;
  start: stringOrDate;
  end: stringOrDate;
}

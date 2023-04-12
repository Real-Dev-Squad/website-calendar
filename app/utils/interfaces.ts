import { Event, stringOrDate } from 'react-big-calendar';

export interface Attendees {
  attendee: {
    email: string;
  };
}
export interface CalEvent extends Event {
  id?: number;
  description?: string;
  location?: string;
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

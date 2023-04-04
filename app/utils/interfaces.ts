import { Event, stringOrDate } from 'react-big-calendar';

export interface CalEvent extends Event {
  id?: string;
  description?: string;
  location?: string;
  visibility?: string;
  attendees?: string[];
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

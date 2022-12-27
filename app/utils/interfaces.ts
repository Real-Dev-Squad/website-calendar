import { Event, stringOrDate } from 'react-big-calendar';

export interface CalEvent extends Event {
  id?: string;
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

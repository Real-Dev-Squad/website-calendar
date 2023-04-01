import { Event as RBCEvent, stringOrDate } from 'react-big-calendar';

export interface CalEvent extends RBCEvent {
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

export interface Attendees {
  attendee: {
    email: string;
  };
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  ownerId: number;
  eventTypeId: number;
  calendarId: number;
  isDeleted: boolean;
  attendees: Attendees[];
  eventType: {
    name: string;
  };
}
